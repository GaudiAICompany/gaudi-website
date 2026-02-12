export const dynamic = "force-static"

export function GET() {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Begum Cital
N:Cital;Begum;;;
ORG:Gaudi AI
TITLE:Founder
TEL;TYPE=CELL:+17736335032
EMAIL:begum@heygaudi.ai
URL:heygaudi.ai
END:VCARD`

  return new Response(vcard, {
    headers: {  
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": "inline; filename=begum.vcf",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
