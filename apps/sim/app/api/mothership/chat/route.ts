// apps/sim/app/api/mothership/chat/route.ts
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(req: Request) {
  const { message, workflowContext } = await req.json()

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: `You are an AI workflow builder assistant for Sim.ai. 
    Help users create and modify automation workflows.
    Current workflow context: ${JSON.stringify(workflowContext)}
    Respond with specific workflow modifications in JSON format.`,
    messages: [{ role: 'user', content: message }]
  })

  return Response.json({
    message: response.content[0].type === 'text' 
      ? response.content[0].text 
      : ''
  })
}
