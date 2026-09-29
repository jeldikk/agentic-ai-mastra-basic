## What are we learning in this course

- What is Agentic AI ?
AI Agent is a system that is design to achieve a particular goal by using functional calls called tools and looping over them.

Agent will decide which tool to call and pass the response of this tool as observation for consecutive loop

- LLM vs Chatbot vs Agent - difference


- Five Building Blocks of Agents
Model, Instruction, Tool, Memory, Agent Loop are five building blocks of agent

- Typescript + Mastra Setup


- First Bare Agent


- Tool Calling
Think of tool is like a capability which is capable of doing particular functionality. Agent will be calling these tools for any information if they need


- Read Tool: getWeather


- Action Tool: Save Note


- Structured Output + Tools


- Multi-Step Agent


- Memory


- Instruction Tuning


- Observability/Tracing



## Commands to test the agent

```sh
$ npm run dev
```
Above command will run `mastra dev` behind the scenes and it will run a web app to test the agent and tools created inside `src/mastra/` folder

Do not forget to provide **OPENAI_API_KEY** in `.env` file.

### What I have learnt in this project

- How to create an agent
- How to create different read and action tools
- Integrating tools with agent and test them from mastra studio UI

---

This is the notes of youtube video with title **AI Agents vs. workflows, clearly explained with realistic examples** by `Mastra`. [Link](https://www.youtube.com/watch?v=0jg2g3sNvgw)

**Introduction**

