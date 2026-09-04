import type { ReactNode } from "react"

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

export const faqCategories: FaqCategory[] = [
  {
    title: "The basics",
    items: [
      {
        question: "What is Gaudi AI?",
        answer:
          "Gaudi AI is a virtual construction estimating coworker. It reads blueprints, creates takeoffs and estimates, and answers project questions in minutes. You can contact Gaudi by email, text, phone, or dashboard chat.",
      },
      {
        question: "Who is Gaudi AI for?",
        answer:
          "Gaudi AI is built primarily for residential general contractors in the United States. Subcontractors and developers can also use it.",
      },
      {
        question: "Is Gaudi AI a takeoff tool, estimating software, or estimating service?",
        answer:
          "Gaudi AI combines all three. It produces construction takeoffs and estimates, provides estimating software for review and editing, and completes the work for you.",
      },
      {
        question: "What types of construction projects can Gaudi AI handle?",
        answer: "Gaudi AI is currently focused on residential construction projects in the United States.",
      },
      {
        question: "Which trades does Gaudi AI support?",
        answer: "Gaudi AI supports quantity and material takeoffs across all construction trades.",
      },
      {
        question: "Do I need to be good with computers?",
        answer:
          "No. Send your plans and instructions by email or text, or call your dedicated Gaudi coworker. Gaudi returns the completed work by email.",
      },
      {
        question: "Can my crew have their own logins?",
        answer:
          "Yes. Each team member can create a login at heygaudi.ai/get-started. You can also ask Gaudi to add copied team members to your company account.",
        answerNode: (
          <>
            Yes. Each team member can create a login at <GetStarted />. You can also ask Gaudi to add copied team members
            to your company account.
          </>
        ),
      },
    ],
  },
  {
    title: "Trying Gaudi AI",
    items: [
      {
        question: "How long does it take to get set up?",
        answer:
          "Setup is immediate. Create an account and upload a blueprint at heygaudi.ai/get-started. No credit card is required.",
        answerNode: (
          <>
            Setup is immediate. Create an account and upload a blueprint at <GetStarted />. No credit card is required.
          </>
        ),
      },
      {
        question: "How do I use Gaudi AI?",
        answer:
          'Send a blueprint PDF to your dedicated Gaudi email or phone number, then describe what you need. For example: "Create a material takeoff," "Create an estimate," or "How many rooms are in this project?"',
      },
      {
        question: "Can I see Gaudi AI before I buy?",
        answer: "Yes. Your first five estimates are free, and no credit card is required. Get started here.",
        answerNode: (
          <>
            Yes. Your first five estimates are free, and no credit card is required.{" "}
            <a href="/get-started" className={linkClass}>
              Get started here
            </a>
            .
          </>
        ),
      },
      {
        question: "Can I try Gaudi AI on a real project?",
        answer: "Yes. Upload a real project blueprint and request your first estimate at heygaudi.ai/get-started.",
        answerNode: (
          <>
            Yes. Upload a real project blueprint and request your first estimate at <GetStarted />.
          </>
        ),
      },
      {
        question: "What is included in my five free jobs?",
        answer:
          "You receive five free estimates plus a dedicated Gaudi coworker that can answer project questions by email, text, or phone.",
      },
      {
        question: "What happens after my five free jobs?",
        answer:
          "Continue sending projects to Gaudi as needed. You only pay when you request a new estimate.",
      },
    ],
  },
  {
    title: "Submitting a project",
    items: [
      {
        question: "What do I need to send to get started?",
        answer:
          "Send a blueprint, your full name, company name, email address, and mobile number. No credit card is required.",
      },
      {
        question: "Which file formats does Gaudi AI accept?",
        answer:
          "Gaudi accepts PDF blueprints, photos of handwritten notes, voice notes, text messages, and email instructions.",
      },
      {
        question: "Can I send plans by email?",
        answer:
          "Yes. Email your blueprints to your dedicated Gaudi coworker. Gaudi will return the completed takeoff or estimate by email.",
      },
      {
        question: "Can I send photos, site notes, voice notes, or specifications?",
        answer:
          "Yes. Gaudi can use photos, site notes, voice notes, and specifications to update its understanding of your project.",
      },
      {
        question: "Can Gaudi AI work with incomplete plans?",
        answer:
          "Yes. Gaudi can work with incomplete plans when essential information, such as the drawing legend, is available. If key details are unclear, Gaudi asks for clarification.",
      },
      {
        question: "What happens after I submit my project?",
        answer:
          "Gaudi reviews the plans, completes the requested work, and emails you the finished output, typically within minutes.",
      },
      {
        question: "I sent a blueprint but did not receive an email. What should I do?",
        answer: "Check your spam folder. If the email is not there, contact help@heygaudi.ai.",
        answerNode: (
          <>
            Check your spam folder. If the email is not there, contact <Help />.
          </>
        ),
      },
    ],
  },
  {
    title: "Takeoffs",
    items: [
      {
        question: "How do I get a construction takeoff?",
        answer:
          'Send your plans by email, text, phone, or dashboard chat and ask: "Gaudi, create a takeoff for this project."',
      },
      {
        question: "How fast is a Gaudi AI takeoff?",
        answer: "Gaudi begins when it receives your plans and typically completes the takeoff within minutes.",
      },
      {
        question: "What is included in a Gaudi AI takeoff?",
        answer: "Gaudi provides quantity and material takeoffs across all trades included in the project plans.",
      },
      {
        question: "What does the final takeoff look like?",
        answer:
          "Gaudi AI outputs can include an Excel takeoff, an annotated blueprint, and a branded PDF for suppliers or clients.",
      },
      {
        question: "Which construction quantities can Gaudi AI identify?",
        answer:
          "Gaudi can identify common construction quantities across trades, including square feet, linear feet, and item counts.",
      },
      {
        question: "Can I trace quantities back to the plans?",
        answer:
          "Yes. Gaudi links takeoff quantities to supporting evidence in the project drawings so you can review the source.",
      },
    ],
  },
  {
    title: "Estimates",
    items: [
      {
        question: "How do I get a construction estimate?",
        answer:
          'Send your plans by email, text, phone, or dashboard chat and ask: "Gaudi, create an estimate for this project."',
      },
      {
        question: "How fast is a Gaudi AI estimate?",
        answer: "Gaudi begins when it receives your plans and typically completes the estimate within minutes.",
      },
      {
        question: "Does the estimate include labor and materials?",
        answer: "Yes. Gaudi estimates can include both labor and material costs.",
      },
      {
        question: "How does Gaudi AI know my pricing?",
        answer:
          "Send Gaudi your price sheet or edit pricing in the dashboard. Gaudi learns from your approved changes and updates company-specific pricing when applicable.",
      },
      {
        question: "Does Gaudi AI identify missing scope?",
        answer: "Yes. Gaudi flags potential scope gaps and asks questions instead of making unsupported assumptions.",
      },
      {
        question: "Are assumptions and exclusions included?",
        answer:
          "Yes. Gaudi documents assumptions and exclusions so the estimate is auditable and easy to review.",
      },
      {
        question: "Can I review and edit the estimate?",
        answer:
          "Yes. You can trace every number and edit the estimate in the Gaudi dashboard before sharing it.",
      },
      {
        question: "Are revisions included?",
        answer: "Yes. You can revise the same project as many times as needed.",
      },
      {
        question: "Can I export my estimate to Excel or PDF?",
        answer: "Yes. You can export an Excel estimate, an annotated blueprint, and a branded PDF.",
      },
    ],
  },
  {
    title: "Accuracy and technology",
    items: [
      {
        question: "How does Gaudi AI's takeoff technology work?",
        answer:
          "Gaudi AI uses proprietary AI trained on real construction data to read blueprints and understand project scope. It then applies hard-coded construction and trade rules to calculate quantities and costs consistently. Every number is linked to its source in the plans so you can review the work.",
      },
      {
        question: "Does Gaudi AI hallucinate?",
        answer:
          "Gaudi AI is built to avoid hallucinations. It uses proven construction rules for calculations, shows where each number came from, and asks for clarification when the plans are unclear. This makes the results reliable and easier to verify than a typical AI-generated response.",
      },
      {
        question: "How accurate are Gaudi AI takeoffs and estimates?",
        answer:
          "In internal tests, Gaudi AI has delivered more accurate takeoffs and estimates than human estimators. Gaudi uses built-in trade rules to reduce errors and prevent made-up results. Every quantity and cost is linked to supporting evidence in the plans, so you can verify the work before sending it.",
      },
      {
        question: "How does Gaudi AI prevent missed scope?",
        answer:
          "Gaudi reviews the plans using trade-specific construction rules to identify required quantities and potential scope gaps. It links its work to the drawings and flags missing, unclear, or conflicting details. Instead of guessing, Gaudi asks you for clarification.",
      },
      {
        question: "Can I see how each number was calculated?",
        answer: "Yes. Each value is traceable to its source and visible for review.",
      },
      {
        question: "What happens when drawings are unclear or conflicting?",
        answer: "Gaudi avoids major assumptions and sends clarification questions by text or email.",
      },
      {
        question: "Does a person review the work?",
        answer:
          "Gaudi does not include a dedicated human reviewer. You review and approve the work in the dashboard before sending it to a client.",
      },
      {
        question: "Does Gaudi AI learn from my corrections and preferences?",
        answer:
          "Yes. Gaudi learns from your edits, pricing changes, and preferences to improve future company-specific outputs.",
      },
    ],
  },
  {
    title: "Pricing and billing",
    items: [
      {
        question: "How much does Gaudi AI cost?",
        answer: "Gaudi AI costs $150 per completed estimate. Your first five estimates are free.",
      },
      {
        question: "Are there setup fees or contracts?",
        answer:
          "No. Gaudi has no subscriptions, seat fees, or contracts. You pay per completed estimate.",
      },
      {
        question: "Is there a limit on projects or estimates?",
        answer: "No. You can request estimates for as many projects as needed.",
      },
      {
        question: "What counts as one job or estimate?",
        answer: "One job is an estimate for one unique project address.",
      },
      {
        question: "Are edits and revisions included in the price?",
        answer: "Yes. Edits and revisions for the same project are included.",
      },
      {
        question: "Is volume pricing available?",
        answer: "Contact contact@heygaudi.ai to discuss volume pricing.",
        answerNode: (
          <>
            Contact <Contact /> to discuss volume pricing.
          </>
        ),
      },
      {
        question: "Can I cancel?",
        answer:
          "There is no subscription to cancel because you pay only when you request an estimate.",
      },
      {
        question: "Can I export my data?",
        answer: "Yes. You can download your company data from the Gaudi dashboard.",
      },
    ],
  },
  {
    title: "Security and data",
    items: [
      {
        question: "Is my project information confidential?",
        answer:
          "Yes. Gaudi keeps your company and project information confidential and does not share it with other customers. Read the Gaudi AI Privacy Policy.",
        answerNode: (
          <>
            Yes. Gaudi keeps your company and project information confidential and does not share it with other
            customers. Read the <Privacy />.
          </>
        ),
      },
      {
        question: "Who can access my plans and estimates?",
        answer:
          "Only authorized users in your company account can access your plans and estimates. Learn more in the Gaudi AI Privacy Policy.",
        answerNode: (
          <>
            Only authorized users in your company account can access your plans and estimates. Learn more in the{" "}
            <Privacy />.
          </>
        ),
      },
      {
        question: "Can I request that my data be deleted?",
        answer:
          "Yes. Email help@heygaudi.ai to request data deletion. See the Gaudi AI Privacy Policy for more information.",
        answerNode: (
          <>
            Yes. Email <Help /> to request data deletion. See the <Privacy /> for more information.
          </>
        ),
      },
    ],
  },
  {
    title: "Integrations and support",
    items: [
      {
        question: "Does Gaudi AI work with my existing estimating process?",
        answer:
          "Yes. Gaudi fits into existing workflows through email, text, WhatsApp, phone, and dashboard chat.",
      },
      {
        question: "Does Gaudi AI integrate with Excel?",
        answer: "Yes. Gaudi can provide takeoffs and estimates in Excel format.",
      },
      {
        question: "Does Gaudi AI integrate with Procore?",
        answer: "A Procore integration is in development.",
      },
      {
        question: "Does Gaudi AI integrate with Autodesk?",
        answer: "An Autodesk integration is in development.",
      },
      {
        question: "Does Gaudi AI integrate with QuickBooks?",
        answer: "A QuickBooks integration is in development.",
      },
      {
        question: "Can my team communicate with Gaudi AI by email, text, or WhatsApp?",
        answer:
          "Yes. Your team can contact Gaudi by email, text, WhatsApp, phone, or dashboard chat.",
      },
      {
        question: "What support is available?",
        answer: "Email help@heygaudi.ai for support.",
        answerNode: (
          <>
            Email <Help /> for support.
          </>
        ),
      },
    ],
  },
  {
    title: "Product comparisons",
    items: [
      {
        question: "How is Gaudi AI different from traditional construction estimating software?",
        answer:
          "Traditional estimating software gives you tools and leaves your team to do the work. Gaudi AI does the work for you. Send Gaudi your blueprints and instructions by email, text, phone, or dashboard, and receive a completed, editable estimate in minutes. There is no new workflow to learn, no manual data entry, and no subscription or seat fee.",
      },
      {
        question: "How is Gaudi AI different from hiring an estimator?",
        answer:
          "Gaudi AI gives you estimating capacity without recruiting, onboarding, salary, or added headcount. It is available on demand and costs $150 per completed estimate, with no subscription or contract. Your team keeps control of the final review and bid decision while Gaudi handles the time-consuming takeoff and estimate preparation.",
      },
      {
        question: "How is Gaudi AI different from an outsourced estimating service?",
        answer:
          "Gaudi AI is not a project-by-project handoff to an outside team. It is a dedicated virtual coworker you can contact anytime by email, text, WhatsApp, phone, or dashboard chat. Gaudi returns finished estimates in minutes, answers follow-up questions, includes revisions, and learns your approved pricing and preferences. You pay $150 per completed estimate only when you need one.",
      },
      {
        question: "Is Gaudi AI an alternative to Bluebeam, STACK, Autodesk Takeoff, or Togal?",
        answer:
          "Yes, Gaudi AI can replace or complement traditional takeoff and estimating tools, depending on your workflow. The clearest difference is simple: most estimating platforms help your team perform the work, while Gaudi AI completes the work for you. Send plans and instructions through the channels you already use, then receive a traceable, editable estimate without learning new software or entering every quantity and cost yourself.",
      },
      {
        question: "Should I use Gaudi AI or hire another estimator?",
        answer:
          "Use Gaudi AI when you need to bid more projects, shorten turnaround time, or add estimating capacity without adding headcount. Gaudi handles takeoffs and estimate preparation on demand, while your team keeps control of pricing strategy, final review, and bid submission. This lets you scale estimating capacity with your workload instead of carrying a fixed cost.",
      },
      {
        question: "What makes Gaudi AI different?",
        answer:
          "Gaudi AI is an AI estimator that delivers completed work, not just estimating software. It turns blueprints, site notes, calls, texts, and emails into ready-to-send estimates in minutes. Every number is traceable to its source, every estimate can be reviewed and edited, and Gaudi learns from your approved pricing changes. Your first five estimates are free, then each completed estimate costs $150, with no subscription, seat fee, or contract.",
      },
    ],
  },
]

// Flattened list of every question/answer pair for the JSON-LD FAQPage schema.
export const allFaqItems: FaqItem[] = faqCategories.flatMap((category) => category.items)
