import React from 'react'

import type { FaqBlock as FaqBlockProps } from '@/payload-types'

export const FaqBlock: React.FC<FaqBlockProps> = (props) => {
  const { title, description, questions } = props
  return (
    <section className="py-32 w-full">
      <div className="container">
        <div className="text-center">
          <h1 className="mt-4 text-4xl font-semibold">{title}</h1>
          <p className="mt-6 font-medium text-muted-foreground">{description}</p>
        </div>
        <div className="mx-auto mt-14 max-w-xl">
          {questions &&
            questions.length > 0 &&
            questions.map((faq, index) => {
              return (
                <div key={index} className="mb-8 flex gap-4">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-secondary font-mono text-xs text-primary">
                    {index + 1}
                  </span>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-medium">{faq.question}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}
