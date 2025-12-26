async function saveUserSpotifyData() {
  const token = localStorage.getItem("spotify_access_token");

  const profile = await getSpotifyProfile();
  const topArtists = await getTop("artists");
  const topTracks = await getTop("tracks");

  const user = firebase.auth().currentUser;

  await db.collection("users").doc(user.uid).set({
    email: user.email,
    displayName: user.displayName,
    spotifyId: profile.id,
    topArtistIds: topArtists.items.map(a => a.id),
    topTrackIds: topTracks.items.map(t => t.id),
    genres: topArtists.items.flatMap(a => a.genres),
    updatedAt: Date.now()
  }, { merge: true });

  console.log("Saved Spotify data");
}


function jaccard(a, b) {
  const setA = new Set(a);
  const setB = new Set(b);

  const intersection = [...setA].filter(x => setB.has(x)).length;
  const union = new Set([...a, ...b]).size;

  if (union === 0) return 0;
  return intersection / union;
}

async function compatibilityBetweenUsers(uid1, uid2) {
  const u1 = (await db.collection("users").doc(uid1).get()).data();
  const u2 = (await db.collection("users").doc(uid2).get()).data();

  const artistScore = jaccard(u1.topArtistIds, u2.topArtistIds);
  const genreScore = jaccard(u1.genres, u2.genres);

  const total = (artistScore * 0.7 + genreScore * 0.3) * 100;

  return Math.round(total);
}

async function getCompatibilityWithEveryone() {
  const user = firebase.auth().currentUser;
  const snapshot = await db.collection("users").get();

  const results = [];

  for (const doc of snapshot.docs) {
    if (doc.id === user.uid) continue;
    const score = await compatibilityBetweenUsers(user.uid, doc.id);
    results.push({ uid: doc.id, score });
  }

  results.sort((a,b) => b.score - a.score);

  console.log(results);
  window.getCompatibilityWithEveryone = getCompatibilityWithEveryone;

}
