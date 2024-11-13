import { FastifyInstance } from "fastify";
import { SplitPosition } from "../../utils/split-position";
import { prisma } from "../../lib/prisma";

export async function GetBusinessByLocation(app: FastifyInstance) {
  app.get("/business/:city/:position/:range", async (request, reply) => {
    const { position, city, range }: any = request.params;
    const earthRadius = 6371;
    let businesses = [];

    // If city is empty or "0", fetch all businesses
    if (city === "0" || city == null || city === "") {
      businesses = await prisma.business.findMany();
    } else {
      businesses = await prisma.business.findMany({
        where: { city },
        orderBy: { urgency: "desc" },
      });
    }

    // If position is 0 or range is 0, return all businesses without distance filtering
    if (position === "0" || range === "0") {
      return reply.send(businesses);
    }

    const businessesInRange = businesses.filter((b) => {
      if (b.position) {
        const [bLat, bLong] = SplitPosition(b.position); 
        const [uLat, uLong] = SplitPosition(position); 

        // Convert degrees to radians
        const rad = (deg: any) => (deg * Math.PI) / 180;
        const dLat = rad(bLat - uLat);
        const dLon = rad(bLong - uLong);

        // Haversine formula
        const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos(rad(uLat)) * Math.cos(rad(bLat)) * Math.sin(dLon / 2) ** 2;

        const distance =
          2 * earthRadius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return distance <= parseFloat(range); // Filter by radius
      }
      return false;
    });

    return reply.send(businessesInRange);
  });
}
