import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { createClient } from '@/utils/supabase/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ bucket: string; file: string }> }
): Promise<NextResponse> {
  request.nextUrl.searchParams
  const bucket = (await params).bucket;
  const fileParam = (await params).file;
  const filePath = Array.isArray(fileParam) ? fileParam.join('/') : fileParam; const cookieStore = await cookies()
  const supabase = createClient(cookieStore)


  const { data, error } = await supabase.storage.from(bucket).download(filePath);

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message || 'File not found' },
      { status: 400 }
    );
  }
  const contentType = data.type || 'application/octet-stream';

  const headers = new Headers();
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  headers.set('Content-Type', contentType);

  return new NextResponse(data, { status: 200, headers });
}
