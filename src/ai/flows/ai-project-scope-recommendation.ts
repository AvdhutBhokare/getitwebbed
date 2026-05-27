'use server';
/**
 * @fileOverview An AI agent that analyzes a project description and recommends a suitable technology stack and core features.
 *
 * - aiProjectScopeRecommendation - A function that handles the AI project scoping process.
 * - ProjectDescriptionInput - The input type for the aiProjectScopeRecommendation function.
 * - ProjectScopeRecommendationOutput - The return type for the aiProjectScopeRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProjectDescriptionInputSchema = z.object({
  description: z
    .string()
    .describe('A detailed description of the project idea, goals, and any existing systems.'),
});
export type ProjectDescriptionInput = z.infer<typeof ProjectDescriptionInputSchema>;

const ProjectScopeRecommendationOutputSchema = z.object({
  summary: z.string().describe('A brief summary of the project based on the description.'),
  recommendedTechStack: z
    .array(z.string())
    .describe('A list of recommended technologies and frameworks (e.g., Next.js, Firebase, Flutter, React Native, Arduino, ESP32) suitable for the project.'),
  coreFeatures: z
    .array(z.string())
    .describe('A list of core features that the project should include based on the description.'),
});
export type ProjectScopeRecommendationOutput = z.infer<typeof ProjectScopeRecommendationOutputSchema>;

export async function aiProjectScopeRecommendation(
  input: ProjectDescriptionInput
): Promise<ProjectScopeRecommendationOutput> {
  return aiProjectScopeRecommendationFlow(input);
}

const projectScopeRecommendationPrompt = ai.definePrompt({
  name: 'projectScopeRecommendationPrompt',
  input: {schema: ProjectDescriptionInputSchema},
  output: {schema: ProjectScopeRecommendationOutputSchema},
  prompt: `You are an expert technical consultant for GetItWebbed, a tech service agency specializing in Brand Establishment, Web Development, App Development, and IoT Project solutions.

Your task is to analyze a client's project description and provide an initial recommendation for a suitable technology stack and potential core features.

Consider the following services GetItWebbed offers:
- Brand Establishment: End-to-End Branding, Visual Identity, Brand Guidelines, Logo Design
- Web Development: Landing Pages, E-Commerce, SaaS Dashboards, CMS Integration, UI/UX Design
- App Development: Android Apps, Flutter/React Native, Backend APIs
- College Projects: Academic project implementation, documentation, and technical support
- IoT Projects: Sensor Integration, Smart Home Systems, Industrial Automation, Arduino / Raspberry Pi / ESP32, Cloud Dashboards

Based on the project description below, provide:
1. A brief summary of the project.
2. A list of recommended technologies and frameworks. Prioritize modern, scalable, and efficient tools. Consider Next.js, Firebase, Flutter, React Native, Arduino, ESP32, Raspberry Pi, TailwindCSS, etc.
3. A list of core features that the project should include.

Project Description: {{{description}}}`,
});

const aiProjectScopeRecommendationFlow = ai.defineFlow(
  {
    name: 'aiProjectScopeRecommendationFlow',
    inputSchema: ProjectDescriptionInputSchema,
    outputSchema: ProjectScopeRecommendationOutputSchema,
  },
  async input => {
    const {output} = await projectScopeRecommendationPrompt(input);
    if (!output) {
      throw new Error('AI did not return a valid output for project scope recommendation.');
    }
    return output;
  }
);
