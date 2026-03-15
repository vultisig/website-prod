"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "radix-ui"
import {
  motion,
  AnimatePresence,
  type HTMLMotionProps,
  type Transition,
} from "motion/react"

import {
  Highlight,
  HighlightItem,
  type HighlightProps,
  type HighlightItemProps,
} from "@/components/animate-ui/primitives/effects/highlight"
import { getStrictContext } from "@/lib/get-strict-context"
import { useControlledState } from "@/hooks/use-controlled-state"
import {
  AutoHeight,
  type AutoHeightProps,
} from "@/components/animate-ui/primitives/effects/auto-height"
import { cn } from "@/lib/utils"

type TabsContextType = {
  value: string | undefined
  setValue: TabsProps["onValueChange"]
}

const [TabsProvider, useTabs] = getStrictContext<TabsContextType>("TabsContext")

type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root>

function Tabs(props: TabsProps) {
  const [value, setValue] = useControlledState({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: props.onValueChange,
  })

  return (
    <TabsProvider value={{ value, setValue }}>
      <TabsPrimitive.Root
        data-slot="tabs"
        {...props}
        onValueChange={setValue}
      />
    </TabsProvider>
  )
}

type TabsHighlightProps = Omit<HighlightProps, "controlledItems" | "value">

function TabsHighlight({
  transition = { type: "spring", stiffness: 200, damping: 25 },
  ...props
}: TabsHighlightProps) {
  const { value } = useTabs()

  return (
    <Highlight
      data-slot="tabs-highlight"
      controlledItems
      value={value}
      transition={transition}
      click={false}
      {...props}
    />
  )
}

type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List>

function TabsList({ className, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-background inline-flex h-14 w-fit items-center justify-center rounded-xl overflow-hidden border border-white/10",
        className,
      )}
      {...props}
    />
  )
}

type TabsHighlightItemProps = HighlightItemProps & {
  value: string
}

function TabsHighlightItem(props: TabsHighlightItemProps) {
  return <HighlightItem data-slot="tabs-highlight-item" {...props} />
}

type TabsTriggerProps = React.ComponentProps<typeof TabsPrimitive.Trigger>

function TabsTrigger({ className, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex cursor-pointer items-center size-full justify-center whitespace-nowrap px-2 py-1 text-sm font-medium ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-r border-borderLight data-[state=active]:bg-primaryAccent2 z-[1]",
        className,
      )}
      {...props}
    />
  )
}

type TabsContentProps = React.ComponentProps<typeof TabsPrimitive.Content> &
  HTMLMotionProps<"div">

function TabsContent({
  value,
  forceMount,
  transition = { duration: 0.5, ease: "easeInOut" },
  ...props
}: TabsContentProps) {
  return (
    <AnimatePresence mode="wait">
      <TabsPrimitive.Content asChild forceMount={forceMount} value={value}>
        <motion.div
          data-slot="tabs-content"
          layout
          layoutDependency={value}
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(4px)" }}
          transition={transition}
          {...props}
        />
      </TabsPrimitive.Content>
    </AnimatePresence>
  )
}

type TabsContentsAutoProps = AutoHeightProps & {
  mode?: "auto-height"
  children: React.ReactNode
  transition?: Transition
}

type TabsContentsLayoutProps = Omit<HTMLMotionProps<"div">, "transition"> & {
  mode: "layout"
  children: React.ReactNode
  transition?: Transition
}

type TabsContentsProps = TabsContentsAutoProps | TabsContentsLayoutProps

const defaultTransition: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 30,
}

function isAutoMode(props: TabsContentsProps): props is TabsContentsAutoProps {
  return !("mode" in props) || props.mode === "auto-height"
}

function TabsContents(props: TabsContentsProps) {
  const { value } = useTabs()
  const childrenArray = React.Children.toArray(props.children)
  const activeIndex = childrenArray.findIndex(
    (child): child is React.ReactElement<{ value: string }> =>
      React.isValidElement(child) &&
      typeof child.props === "object" &&
      child.props !== null &&
      "value" in child.props &&
      child.props.value === value,
  )

  if (isAutoMode(props)) {
    const { transition = defaultTransition, children, ...autoProps } = props

    return (
      <AutoHeight
        data-slot="tabs-contents"
        deps={[value]}
        transition={transition}
        {...autoProps}
      >
        <motion.div
          className="flex -mx-2"
          animate={{ x: activeIndex * -100 + "%" }}
          transition={transition}
        >
          {childrenArray.map((child, index) => (
            <div key={index} className="w-full shrink-0 px-2">
              {child}
            </div>
          ))}
        </motion.div>
      </AutoHeight>
    )
  }

  const {
    transition = defaultTransition,
    style,
    children,
    ...layoutProps
  } = props

  return (
    <motion.div
      data-slot="tabs-contents"
      layout="size"
      layoutDependency={value}
      style={{ overflow: "hidden", ...style }}
      transition={{ layout: transition }}
      {...layoutProps}
    >
      <motion.div
        className="flex -mx-2"
        animate={{ x: activeIndex * -100 + "%" }}
        transition={transition}
      >
        {childrenArray.map((child, index) => (
          <div key={index} className="w-full shrink-0 px-2">
            {child}
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export {
  Tabs,
  TabsHighlight,
  TabsHighlightItem,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsContents,
  type TabsProps,
  type TabsHighlightProps,
  type TabsHighlightItemProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps,
  type TabsContentsProps,
}
