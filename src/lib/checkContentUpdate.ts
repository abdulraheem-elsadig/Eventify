/**
 * Checks if the data for a specific event has changed and triggers a revalidation
 * of the corresponding page if needed.
 *
 * @param {Object} params - The parameters for the function.
 * @param {string} params.path - The path of the page to revalidate.
 * @param {string | number} params.id - The ID of the event to check.
 * @param {any} params.originalData - The original event data to compare against.
 *
 * @returns {Promise<void>} - A Promise that resolves when the operation is complete.
 *
 * This function fetches the latest data for the given event ID from a mock API,
 * compares it with the original data, and if changes are detected, it triggers
 * a revalidation of the specified page via an API call.
 */

import { Event } from "@/types";

export async function checkContentUpdate({
  path,
  id,
  originalData,
  onRevalidated,
}: {
  path: string;
  id: string | number;
  originalData: any;
  onRevalidated: (event: Event) => void;
}) {
  try {
    const res = await fetch(
      `https://681743db26a599ae7c39cff0.mockapi.io/api/v1/events/?id=${id}`
    );
    const data: Event[] = await res.json();

    // Filter to the exact match
    const event = data.find((event) => Number(event.id) === Number(id));

    // Check if content changed
    const changed = JSON.stringify(event) !== JSON.stringify(originalData);

    if (changed) {
      // Revalidate event page when content change
      await fetch(`/api/revalidate?path=${encodeURIComponent(path)}`);
      console.log(
        `[revalidate] Path ${path} was revalidated due to data change.`
      );
      onRevalidated(event!);
    } else {
      console.log(`[revalidate] No change for path ${path}.`);
    }
  } catch (err) {
    console.error(`[revalidate] Failed to check/update path ${path}`, err);
  }
}
