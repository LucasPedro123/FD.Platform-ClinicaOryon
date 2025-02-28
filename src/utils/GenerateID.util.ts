export default function GenerateId(): number {
  return Date.now() + Math.floor(Math.random() * 1000000);
}

