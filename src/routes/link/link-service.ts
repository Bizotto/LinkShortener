import { v4 as uuid } from "uuid";
import db from "../../prisma";
import { CreateLinkDto } from "./DTO/create-link-dto";

export async function getLink() {
  try {
    return await db.link.findMany();
  } catch (error) {
    return error;
  }
}

export async function getLinkById(newUrl: string) {
  try {
    if (!newUrl) throw new Error("newUrl is required");
    const link = await db.link.findUnique({ where: { newUrl } });

    if (!link) throw new Error("Link not found");
    return link.url;
  } catch (error) {
    return String(error);
  }
}

export async function createLink(options: CreateLinkDto) {
  try {
    const { url } = options;
    if (!url) throw new Error("URL is required");
    const generateNewUrl = uuid().slice(0, 5);
    const alreadyExists = await db.link.findUnique({
      where: { newUrl: generateNewUrl },
    });
    if (alreadyExists) throw new Error("New URL already exists");

    const response = await db.link.create({
      data: { url, newUrl: generateNewUrl },
    });

    return response.newUrl;
  } catch (error) {
    return error;
  }
}

export async function deleteLink(id: string) {
  try {
    if (!id) throw new Error("ID is required");
    await db.link.delete({ where: { id } });
    return `Link with ID ${id} has been deleted.`;
  } catch (error) {
    return error;
  }
}
