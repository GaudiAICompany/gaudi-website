import type { ReactNode } from "react"
import faqsData from "@/public/faqs.json"

// Consistent inline-link style for answers that reference a URL.
const linkClass = "font-medium text-primary underline-offset-4 hover:underline"

const GetStarted = () => (
  <a href="/get-started" className={linkClass}>
    heygaudi.ai/get-started
  </a>
)
const Help = () => (
  <a href="mailto:help@heygaudi.ai" className={linkClass}>
    help@heygaudi.ai
  </a>
)
const Contact = () => (
  <a href="mailto:contact@heygaudi.ai" className={linkClass}>
    contact@heygaudi.ai
  </a>
)
const Privacy = () => (
  <a href="/privacy" className={linkClass}>
    Gaudi AI Privacy Policy
  </a>
)

export type FaqItem = {
  question: string
  // Exact, word-for-word plain text used for the JSON-LD FAQPage schema.
  answer: string
  // Optional richer display node (identical wording, with inline links).
  answerNode?: ReactNode
}

export type FaqCategory = {
  title: string
  items: FaqItem[]
}

// Inline-link enrichments keyed by question text. Any question not listed here
// renders its plain-text answer from faqs.json as-is.
const answerNodes: Record<string, ReactNode> = {
  "Can my crew have their own logins?": (
    <>
      Yes. Each team member can create a login at <GetStarted />. You can also ask Gaudi to add copied team members to
      your company account.
    </>
  ),
  "How long does it take to get set up?": (
    <>
      Setup is immediate. Create an account and upload a blueprint at <GetStarted />. No credit card is required.
    </>
  ),
  "Can I see Gaudi AI before I buy?": (
    <>
      Yes. Your first five estimates are free, and no credit card is required.{" "}
      <a href="/get-started" className={linkClass}>
        Get started here
      </a>
      .
    </>
  ),
  "Can I try Gaudi AI on a real project?": (
    <>
      Yes. Upload a real project blueprint and request your first estimate at <GetStarted />.
    </>
  ),
  "I sent a blueprint but did not receive an email. What should I do?": (
    <>
      Check your spam folder. If the email is not there, contact <Help />.
    </>
  ),
  "Is volume pricing available?": (
    <>
      Contact <Contact /> to discuss volume pricing.
    </>
  ),
  "Is my project information confidential?": (
    <>
      Yes. Gaudi keeps your company and project information confidential and does not share it with other customers. Read
      the <Privacy />.
    </>
  ),
  "Who can access my plans and estimates?": (
    <>
      Only authorized users in your company account can access your plans and estimates. Learn more in the <Privacy />.
    </>
  ),
  "Can I request that my data be deleted?": (
    <>
      Yes. Email <Help /> to request data deletion. See the <Privacy /> for more information.
    </>
  ),
  "What support is available?": (
    <>
      Email <Help /> for support.
    </>
  ),
}

export const faqCategories: FaqCategory[] = (faqsData as Array<{ title: string; items: Array<{ question: string; answer: string }> }>).map(
  (category) => ({
    title: category.title,
    items: category.items.map((item) => ({
      ...item,
      answerNode: answerNodes[item.question],
    })),
  }),
)

// Flattened list of every question/answer pair for the JSON-LD FAQPage schema.
export const allFaqItems: FaqItem[] = faqCategories.flatMap((category) => category.items)
