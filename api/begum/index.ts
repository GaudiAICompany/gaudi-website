import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Seb
N:Seb;;;;
ORG:Gaudi AI
TITLE:Founder
TEL;TYPE=CELL:+17736335032
EMAIL:seb@heygaudi.ai
URL:https://heygaudi.ai
END:VCARD`

  context.res = {
    status: 200,
    headers: {
      "Content-Type": "text/x-vcard; charset=utf-8",
      "Content-Disposition": "inline; filename=seb.vcf"
    },
    body: vcard
  }
}

export default httpTrigger
