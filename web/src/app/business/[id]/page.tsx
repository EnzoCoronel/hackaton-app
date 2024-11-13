// app/business/[id]/page.tsx

import { notFound } from "next/navigation";
import { mockBusinesses } from "./data";
import { Business } from "./types";
import Link from "next/link";

async function getBusiness(id: string): Promise<Business | undefined> {
  return mockBusinesses.find((business) => business.id === id);
}

export default async function BusinessPage({
  params,
}: {
  params: { id: string };
}) {
  const business = await getBusiness(params.id);

  if (!business) {
    notFound();
  }

  return (
    <>
      <header className="w-full bg-sky-200 shadow-md">
        <nav className="max-w-5xl mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold text-gray-800">acceesive</h1>
          <Link href="/" className="text-blue-500 underline">
            <img alt="Return Home" src="/home.svg" />
          </Link>
        </nav>
      </header>
      <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden">
          {business.logo && (
            <img
              src={business.logo}
              alt={`${business.name} logo`}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">
              {business.name}
            </h1>
            <p className="text-gray-600 mb-4">{business.description}</p>
            <div className="text-gray-600">
              <p>
                <strong>City:</strong> {business.city}
              </p>
              <a
                className="flex gap-3"
                aria-label="Chat on WhatsApp"
                href="https://wa.me/1XXXXXXXXXX"
              >
                <strong> Phone:</strong>
                {business.phone}
                <img alt="Chat on WhatsApp" src="/WhatsApp.svg" />
              </a>
              {business.position && (
                <p>
                  <strong>Position:</strong> {business.position}
                </p>
              )}
              {business.pixText && (
                <p>
                  <strong>Pix Text:</strong> {business.pixText}
                </p>
              )}
              {business.pixKey && (
                <p>
                  <strong>Pix Key:</strong> {business.pixKey}
                </p>
              )}
              <p>
                <strong>Urgency:</strong> {business.urgency ? "Yes" : "No"}
              </p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Links</h2>
              <ul className="list-disc list-inside">
                {business.links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-6 text-gray-500 text-sm">
              Created at: {business.createdAt.toDateString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
