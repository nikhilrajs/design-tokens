// import './App.css'
import { AppSidebar } from "./components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./components/ui/breadcrumb"
import { Separator } from "./components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs"

import { Buttons } from './features/buttons'
import { Inputs } from './features/inputs'
import { Tokens } from './features/tokens'


function App() {
  return (
    <>
      <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Build Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">

					<div>
						<Tabs defaultValue="tokens" >
							<TabsList variant="line">
								<TabsTrigger value="tokens">Tokens</TabsTrigger>
								<TabsTrigger value="buttons">Buttons</TabsTrigger>
								<TabsTrigger value="inputs">Inputs</TabsTrigger>
								<TabsTrigger value="reports">Reports</TabsTrigger>
								<TabsTrigger value="settings">Settings</TabsTrigger>
							</TabsList>
							<TabsContent value="tokens" className="space-y-6">
								<Tokens />
							</TabsContent>
							<TabsContent value="buttons" className="space-y-6">
								<Buttons />
							</TabsContent>
							<TabsContent value="inputs">
								<Inputs />
							</TabsContent>
							<TabsContent value="analytics">
								<Card>
									<CardHeader>
										<CardTitle>Analytics</CardTitle>
										<CardDescription>
											Track performance and user engagement metrics. Monitor trends and
											identify growth opportunities.
										</CardDescription>
									</CardHeader>
									<CardContent className="text-sm text-muted-foreground">
										Page views are up 25% compared to last month.
									</CardContent>
								</Card>
							</TabsContent>
							<TabsContent value="reports">
								<Card>
									<CardHeader>
										<CardTitle>Reports</CardTitle>
										<CardDescription>
											Generate and download your detailed reports. Export data in
											multiple formats for analysis.
										</CardDescription>
									</CardHeader>
									<CardContent className="text-sm text-muted-foreground">
										You have 5 reports ready and available to export.
									</CardContent>
								</Card>
							</TabsContent>
							<TabsContent value="settings">
								<Card>
									<CardHeader>
										<CardTitle>Settings</CardTitle>
										<CardDescription>
											Manage your account preferences and options. Customize your
											experience to fit your needs.
										</CardDescription>
									</CardHeader>
									<CardContent className="text-sm text-muted-foreground">
										Configure notifications, security, and themes.
									</CardContent>
								</Card>
							</TabsContent>
						</Tabs>
					</div>

          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
    </>
  )
}

export default App
