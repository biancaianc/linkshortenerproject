# Agent Instructions Index

This file serves as the entry point for AI coding agents working on this project. All coding standards, patterns, and guidelines are organized into topic-specific documents in the `/docs` directory.

⚠️ **It is INCREDIBLY IMPORTANT that you ALWAYS read the relevant individual instruction files in the `/docs` directory BEFORE generating ANY code.** Never write or modify code in this project without first consulting the matching documentation for the area you are working on.

## 📚 Documentation Structure

### Core References

For detailed guidelines on specific topics, refer to the modular documentation in the `/docs` directory.
You MUST ALWAYS refer to the relevant `.md` file in `/docs` BEFORE generating ANY code:

1. **[Authentication & Security](./docs/01-auth-security.md)**
   - Clerk as sole authentication provider
   - Protected routes and redirects
   - Modal-based sign in/sign up flows
   - Implementation guidelines with Clerk SDK

2. **[UI Components](./docs/02-ui-components.md)**
   - shadcn/ui as exclusive component library
   - Component installation and usage
   - Composition patterns
   - Customization guidelines

## 🎯 Quick Start for Agents

Before making any code changes:

1. **Read** the relevant individual instruction file(s) in `/docs` for the area you are touching (this step is mandatory BEFORE generating ANY code)
2. **Understand** existing patterns in the codebase
3. **Plan** your implementation approach
4. **Implement** following the guidelines
5. **Verify** using the quality checklist
6. **Summarize** what changed and why

## ⚠️ Non-Negotiable Rules

- **Security First**: Never commit secrets or bypass auth
- **Type Safety**: Strict TypeScript, no `any` workarounds
- **Minimal Scope**: Only change what's requested
- **Match Patterns**: Follow existing code conventions
- **Verify Changes**: Run lint/type checks before finishing

## 🔍 Finding the Right Documentation

- **Starting a new feature?** → Read [Project Overview](./docs/01-project-overview.md) + [Agent Workflow](./docs/08-agent-workflow.md)
- **Working with UI?** → Read [Next.js Patterns](./docs/03-nextjs-patterns.md) + [Styling Guide](./docs/04-styling-guide.md) + [UI Components](./docs/09-ui-components.md)
- **Database changes?** → Read [Database Guidelines](./docs/05-database-guidelines.md)
- **Auth-related work?** → Read [Authentication & Security](./docs/06-auth-security.md)
- **Code not compiling?** → Check [TypeScript Conventions](./docs/02-typescript-conventions.md)
- **Ready to merge?** → Review [Quality Checklist](./docs/07-quality-checklist.md)

## 📝 Updates and Evolution

As this project evolves:

- Update documentation when patterns change
- Add new sections for new technologies
- Keep examples current with the codebase
- Remove outdated guidance

## 💡 Philosophy

These instructions exist to:

- Maintain consistency across AI-generated code
- Preserve security and stability
- Reduce review burden
- Enable faster, safer iteration

**When in doubt, choose simplicity and safety over cleverness.**

---

For questions or clarifications, refer to the specific documentation files linked above.
