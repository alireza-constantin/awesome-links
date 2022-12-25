import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../lib/prisma";



export type Context = { prisma: PrismaClient }

export async function createContext(req: NextApiRequest, res: NextApiResponse): Promise<Context> {
    return {
        prisma
    }
}