import { FastifyInstance } from "fastify";

import { prisma } from "../../lib/prisma";
import { SplitPosition } from "../../utils/split-position";

export async function GetBusinessByLocation(app: FastifyInstance) {
  app.get("/business/:city/:position/:range", async (request, reply) => {
    const { position, city, range }: any = request.params;
    const earthRadius = 6371; // Earth's radius in kilometers

    let query: any = {}; // Create an empty query object

    // Filter by city if provided (excluding empty or "0")
    if (city && city !== "0" && city !== "") {
      query.city = city;
    }

    // If range is provided (excluding "0"), consider it for filtering
    if (range && range !== "0") {
      query.position = {
        near: SplitPosition(position), // Use SplitPosition for latitude/longitude
        maxDistance: parseFloat(range) / earthRadius, // Convert distance to radians
      };
    }

    // Fetch businesses based on the constructed query
    const businesses = await prisma.business.findMany({
      where: query,
      orderBy: { urgency: "desc" }, // Sort by urgency (optional)
    });

    reply.send(businesses); // Send the fetched businesses
  });
}