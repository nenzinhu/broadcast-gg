import { getGameBySlug } from "@/lib/catalog";
import { parseSteamScreenshots } from "@/lib/game-media";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const game = getGameBySlug((await params).slug);
  if (!game)
    return Response.json({ error: "Jogo não encontrado." }, { status: 404 });
  try {
    const response = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${game.steamAppId}&l=portuguese&filters=screenshots`,
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(8000) },
    );
    if (!response.ok) throw new Error("Steam unavailable");
    const screenshots = parseSteamScreenshots(
      await response.json(),
      game.steamAppId,
    );
    if (!screenshots.length)
      return Response.json(
        { error: "Capturas de gameplay indisponíveis neste momento." },
        { status: 502 },
      );
    return Response.json({
      screenshots,
      source: `https://store.steampowered.com/app/${game.steamAppId}/`,
    });
  } catch {
    return Response.json(
      {
        error:
          "Não foi possível consultar a mídia da Steam. Tente novamente mais tarde.",
      },
      { status: 502 },
    );
  }
}
