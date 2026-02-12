export const dynamic = "force-static"

export function GET() {
  const vcard = `BEGIN:VCARD
    VERSION:3.0
    FN:Sebastian Piedra
    N:Piedra;Sebastian;;;
    ORG:Gaudi AI
    TITLE:Founder
    TEL;TYPE=CELL:+16084404036
    EMAIL:seb@heygaudi.ai
    URL:https://heygaudi.ai
    END:VCARD`

  return new Response(vcard, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": "inline; filename=sebastian.vcf",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
