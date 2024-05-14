import Redis from "ioredis";

const redis = new Redis();

const initialData: Notes = {
  "1702459181837": JSON.stringify({
    title: "sunt aut",
    content: "quia et suscipit suscipit recusandae",
    updateTime: "2023-12-13T09:19:48.837Z",
  }),
  "1702459182837": JSON.stringify({
    title: "qui est",
    content: "est rerum tempore vitae sequi sint",
    updateTime: "2023-12-13T09:19:48.837Z",
  }),
  "1702459188837": JSON.stringify({
    title: "ea molestias",
    content: "et iusto sed quo iure",
    updateTime: "2023-12-13T09:19:48.837Z",
  }),
};

export async function getAllNotes(): Promise<Notes> {
  let data = await redis.hgetall("notes");
  if (Object.keys(data).length === 0) {
    await redis.hset("notes", initialData);
    data = initialData;
  }
  return data;
}

export async function addNote(data: string): Promise<string> {
  const uuid = Date.now().toString();
  await redis.hset("notes", uuid, data);
  return uuid;
}

export async function updateNote(uuid: string, data: string): Promise<void> {
  await redis.hset("notes", uuid, data);
}

export async function getNote(uuid: string): Promise<Note> {
  const noteString = await redis.hget("notes", uuid);
  return noteString ? JSON.parse(noteString) : null;
}

export async function delNote(uuid: string): Promise<number> {
  return redis.hdel("notes", uuid);
}

export default redis;
