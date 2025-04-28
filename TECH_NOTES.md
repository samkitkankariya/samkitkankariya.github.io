# TRIPY AI - Technical Notes & Learning Resources

This document contains explanations, examples, and learning resources for the technologies used in the TRIPY AI project. It serves as a knowledge base and reference for team members and contributors.

## Table of Contents
1. [Jinja2 Templating](#jinja2-templating)
2. [Agno Framework](#agno-framework)
3. [Python-Telegram-Bot](#python-telegram-bot)
4. [LLM Integration](#llm-integration)

---

## Jinja2 Templating

### Overview

Jinja2 is a powerful templating engine for Python that allows you to:
- Insert variables into templates using `{{ variable }}` syntax
- Use control structures like conditionals and loops
- Create template inheritance hierarchies
- Apply filters to modify values
- Maintain separation between logic and presentation

This is much more powerful than simple string formatting because it lets you:
1. Make decisions in templates (if/else conditions)
2. Iterate over collections of data
3. Apply transformations to values
4. Create modular templates through inheritance

In our implementation, we use Jinja2 to create sophisticated prompt templates that adapt based on user preferences, conversation state, and other contextual factors.

### Basic Syntax Examples

#### Variables
```jinja
Hello, {{ user_name }}!

The weather in {{ destination }} is currently {{ weather_condition }}.
```

#### Conditionals
```jinja
{% if user_preferences.budget == "luxury" %}
I'll recommend high-end accommodations and dining options.
{% elif user_preferences.budget == "mid-range" %}
I'll focus on good value options with a mix of comfort and affordability.
{% else %}
I'll suggest budget-friendly options to maximize your experience.
{% endif %}
```

#### Loops
```jinja
Here are your travel preferences:
{% for preference in user_preferences %}
- {{ preference.category }}: {{ preference.value }}
{% endfor %}
```

#### Filters
```jinja
{{ destination | title }} is beautiful in {{ travel_month | capitalize }}.

Your budget of {{ amount | float }} {{ currency | upper }} is approximately {{ (amount * exchange_rate) | round(2) }} USD.
```

#### Template Inheritance
Base template (`base_prompt.jinja`):
```jinja
You are TRIPY AI, a travel assistant focused on {{ specialization | default("general travel advice") }}.

{% block instructions %}
Provide helpful travel information.
{% endblock %}

{% block context %}
{% endblock %}

{% block query %}
The user is asking: {{ user_query }}
{% endblock %}
```

Inheriting template (`accommodation_prompt.jinja`):
```jinja
{% extends "base_prompt.jinja" %}

{% block instructions %}
Provide accommodation recommendations based on the following criteria:
- Budget: {{ user_preferences.budget }}
- Style: {{ user_preferences.accommodation_style }}
- Location preference: {{ user_preferences.location_preference }}
{% endblock %}

{% block context %}
The destination is {{ destination }} and the trip duration is {{ duration }} days.
{% endblock %}
```

### Implementation in TRIPY AI

In our project, Jinja2 templates are used for:

1. **System prompts** that define agent behavior and capabilities
2. **Task-specific prompts** for different user requests (itinerary creation, restaurant recommendations, etc.)
3. **Dynamic context injection** where user preferences and conversation history are incorporated into prompts
4. **Multi-agent coordination** where specialized agents receive appropriately formatted instructions

Our `PromptManager` class handles loading, rendering, and selecting templates based on the conversation state.

### Resources to Learn More

- [Official Jinja2 Documentation](https://jinja.palletsprojects.com/)
- [Jinja2 Template Designer Documentation](https://jinja.palletsprojects.com/en/3.1.x/templates/)
- [Real Python Jinja2 Tutorial](https://realpython.com/primer-on-jinja-templating/)

---

## Agno Framework

(Content about Agno Framework will be added here)

---

## Python-Telegram-Bot

(Content about Python-Telegram-Bot will be added here)

---

## LLM Integration

(Content about LLM integration with Gemini and Groq will be added here) 