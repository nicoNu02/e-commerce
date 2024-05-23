import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");
  console.log(filename);
  // ⚠️ The below code is for App Router Route Handlers only
  const blob = await put(filename, request.body, {
    access: "public",
    token: "vercel_blob_rw_u8V8yhE8bP8fKg64_9RrmTmPD9wTDw52PzBaIQskfy5u38W",
  });
  console.log(blob);
  // Here's the code for Pages API Routes:
  // const blob = await put(filename, request, {
  //   access: 'public',
  // });

  return NextResponse.json(blob);
}

// The next lines are required for Pages API Routes only
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
