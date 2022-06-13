async function updateRSS() {
  await fetch(`/api/revalidate?secret=${process.env.NEXT_PUBLIC_REVALIDATE_SECRET}`);
}

export default updateRSS;
