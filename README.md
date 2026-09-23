# Makar Frontend Factory

**Makar Frontend Factory** — отдельная инженерная платформа FATHER для разработки сложных frontend, interactive и game-интерфейсов.

Первый production-проект: **ALINA Control Center**.

## Миссия

Не собирать каждый красивый экран с нуля, а создать переиспользуемую фабрику интерфейсов:

**Concept → Principles → Design Tokens → Workspace → Streams → Visualization → Avatar → Composition → QA → Product**

## Главные принципы

1. **Экран — это композиция модулей, а не монолитная страница.**
2. **Информационные потоки отделены от визуального представления.**
3. **Avatar Engine существует независимо от конкретного приложения.**
4. **Composition Engine решает, что, где и в каком приоритете показывать.**
5. **ALINA — первый продукт, но архитектура не должна зависеть только от ALINA.**
6. **Общие UI, scene, avatar, animation, input, state и asset pipelines должны переиспользоваться в будущих играх.**
7. **Красота не отменяет performance, accessibility, testability и traceability.**
8. **DEMO / mock / synthetic data всегда явно маркируются.**

## Архитектурные слои

- Design System / Design Tokens
- UI Primitives
- Workspace Engine
- Information Stream Engine
- Visualization Engine
- Avatar Engine
- Composition / Orchestrator
- Input & Interaction
- Scene & Asset Pipeline
- Game Core
- Performance & Visual QA

## Project 001 — ALINA Control Center

Цель первого проекта — превратить cinematic-концепт ALINA в реальный, интерактивный, адаптивный и производительный интерфейс, одновременно создавая reusable-компоненты для всей платформы FATHER.

## Статус

**M0 — Foundation**

Сначала строим фундамент Макара, затем собираем ALINA поверх него.
