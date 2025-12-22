export async function fetchCurriculumData(): Promise<CurriculumData | null> {
  const gistUrl = process.env.NEXT_PUBLIC_CV_GIST_URL;

  if (!gistUrl) {
    console.error('Environment variable NEXT_PUBLIC_CV_GIST_URL is not defined');
    return null;
  }

  try {
    const response = await fetch(gistUrl, {
      cache: 'force-cache'
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching curriculum data:', error);
    return null;
  }
}