import Image from 'next/image';
import Container from '../../components/Container';
import Navbar from '../../components/Navbar';
import Highlight from '../../components/Highlight';
import Ad from '../../components/Ad';
import AnchorHeader from '../../components/AnchorHeader';
import javaExample from '../../assets/response/java.jsonc';
import bedrockExample from '../../assets/response/bedrock.jsonc';
import iconExample from '../../assets/response/icon.png';
// import javaWidgetLightExample from '../../assets/response/java-widget-light.png';
// import javaWidgetDarkExample from '../../assets/response/java-widget-dark.png';
import Collapsible from '../../components/Collapsible';

export const metadata = {
	title: 'API Documentation',
	description: 'Detailed documentation about our API and how to fetch the status of any Minecraft server through your service.',
	openGraph: {
		title: 'API Documentation - Minecraft Server Status',
		description: 'Detailed documentation about our API and how to fetch the status of any Minecraft server through your service.',
		url: '/docs',
		siteName: 'Minecraft Server Status',
		images: [
			{
				url: '/img/icon.png',
				width: 300,
				height: 300
			}
		],
		locale: 'en-US',
		type: 'website'
	},
	alternates: {
		canonical: '/docs'
	}
};

export default function Page() {
	return (
		<>
			<Navbar active="api" />
			<Container>
				<hgroup>
					<h1 className="h1">API Documentation</h1>
					<p className="text-2xl font-light mt-2">Documentation on how to use our API in your service</p>
				</hgroup>
				<Ad className="mt-5" />
				<section>
					<div className="box bg-red-500 border-red-500 bg-opacity-20 border-opacity-50 rounded p-5 mt-12">
						<p>The documentation for the widget route has been temporarily removed while a fix is being implemented prevent bugs and improve rendering efficiency. We are sorry for the inconvenience.</p>
					</div>
					<section>
						<AnchorHeader size={2} id="overview" className="mt-12">Overview</AnchorHeader>
						<p className="mt-3 leading-7">The goal of this API documentation is to accurately and precisely describe the functionality of this service in plain terms. This page will go over everything you need to know before implementing our API into your service. If you believe there is anything missing, any typos, or incorrect information on this page, please reach out to me via email at <a href="mailto:contact@mcstatus.io" className="link">contact@mcstatus.io</a>.</p>
					</section>
					<section>
						<AnchorHeader size={3} id="standards" className="mt-12">Standards</AnchorHeader>
						<p className="mt-3 leading-7">The majority of this API uses the standardized REST API, which in simple terms means you will be making HTTP requests to our service. We currently only support endpoints using the <code>GET</code> method. You will never have to use <code>POST</code> or any other method with requires you to send body data or headers with your request. All status endpoints return a response body in <a href="https://www.json.org/json-en.html" className="link">JSON format</a>. No other data formatting standard is available at this time, and there is currently no future plan to support anything other than JSON. All JSON returned from this service will have whitespace and any unnecessary characters removed to reduce network bandwidth and wasted information. You may learn more about the properties you receive from these routes by reading the documented response body from the route on this page.</p>
					</section>
					<section>
						<AnchorHeader size={3} id="cache" className="mt-12">Cache</AnchorHeader>
						<p className="mt-3 leading-7">To reduce the amount of spam and deliberate denial-of-service attacks of our service, we implement a caching system for all of the data we fetch, including but not limited to status responses and server icons. Each route has its own cache duration, unique to the pathname of the request. Please note that adding query parameters to the request will not force a fresh request, it will still return the cached response. All routes with data retrieved from the cache will contain a header in the response with the key <code>X-Cache-Hit</code> which will contain a boolean value whether or not our service used a value from cache. The response will also contain a <code>X-Cache-Time-Remaining</code> if the cache was hit, which contains an integer with the amount of seconds remaining until the cache expires for this request. Any request made after this cache expiration time will result in fresh data being retrieved on our end. No exceptions will be made to the cache duration. If you want to bypass the cache, we recommend that you self-host the <a href="https://github.com/mcstatus-io/ping-server" className="link">ping-server</a> available on our GitHub organization.</p>
					</section>
					<section>
						<AnchorHeader size={3} id="supported" className="mt-12">Supported Versions</AnchorHeader>
						<p className="mt-3 leading-7">All Minecraft servers, including pre-netty rewrite Java Edition and Bedrock Edition servers, are supported. Make sure you are using the correct endpoint when retrieving a server status, as attempting to use the Java Edition status route with a Bedrock Edition host (or vise-versa) will result in a response saying the server is offline unless the server explicitly has cross-play supported. If the server you specify does not use the standard port value (<code>25565</code> for Java Edition, <code>19132</code> for Bedrock Edition), then you will need to specify the port by using the following format: <code>host:port</code>.</p>
					</section>
				</section>
				<section>
					<AnchorHeader size={2} id="routes" className="mt-12">Routes</AnchorHeader>
					<section>
						<div className="box p-4 rounded mt-3">
							<AnchorHeader size={3} id="java-status">Java Status</AnchorHeader>
							<p className="mt-2 leading-7">Retrieves the status of any Java Edition Minecraft server. <code>&lt;address&gt;</code> should be replaced with the connection address of the server. For example, <code>play.hypixel.net</code> is a valid connection address as well as <code>play.hypixel.net:25565</code>. You can also set <code>?query=false</code> in the URL query parameters to disable query lookup for faster status retrieval at the expense of missing <code>software</code> and <code>plugins</code> properties.</p>
							<p className="flex items-center gap-2 mt-3">
								<span className="bg-green-700 rounded px-2 py-1 text-xs text-white">GET</span>
								<code className="break-words">https://api.mcstatus.io<span className="font-bold">/v2/status/java/&lt;address&gt;</span></code>
							</p>
							<Collapsible title="Response Body" className="block mt-4" noPadding>
								<Highlight source={javaExample} className="bg-neutral-800 dark:bg-transparent" />
							</Collapsible>
						</div>
					</section>
					<section>
						<div className="box p-4 rounded mt-3">
							<AnchorHeader size={3} id="bedrock-status">Bedrock Status</AnchorHeader>
							<p className="mt-2 leading-7">Retrieves the status of any Bedrock Edition Minecraft server. <code>&lt;address&gt;</code> should be replaced with the connection address of the server. For example, <code>pe.mineplex.com</code> is a valid connection address as well as <code>pe.mineplex.com:19132</code>.</p>
							<p className="flex items-center gap-2 mt-3">
								<span className="bg-green-700 rounded px-2 py-1 text-xs text-white">GET</span>
								<code className="break-words">https://api.mcstatus.io<span className="font-bold">/v2/status/bedrock/&lt;address&gt;</span></code>
							</p>
							<Collapsible title="Response Body" className="block mt-4" noPadding>
								<Highlight source={bedrockExample} className="bg-neutral-800 dark:bg-transparent" />
							</Collapsible>
						</div>
					</section>
					{/*<section>
						<div className="box p-4 rounded mt-3">
							<AnchorHeader size={3} id="java-widget">Java Widget</AnchorHeader>
							<p className="mt-2 leading-7">Returns a widget image containing information about the Java Edition server. This widget can be embedded into any website or any source that allows images via URL.</p>
							<p className="flex items-center gap-2 mt-3">
								<span className="bg-green-700 rounded px-2 py-1 text-xs text-white">GET</span>
								<code className="break-words">https://api.mcstatus.io<span className="font-bold">/v2/widget/java/&lt;address&gt;?dark=&lt;true/false&gt;</span></code>
							</p>
							<Collapsible title="Response Body" className="block mt-4">
								<div className="flex items-center gap-3">
									<Image src={javaWidgetLightExample} alt="Sample Java Edition server light widget" />
									<Image src={javaWidgetDarkExample} alt="Sample Java Edition server dark widget" />
								</div>
							</Collapsible>
						</div>
	</section>*/}
					<section>
						<div className="box p-4 rounded mt-3">
							<AnchorHeader size={3} id="icon">Icon</AnchorHeader>
							<p className="mt-2 leading-7">Returns just the icon/favicon of any Java Edition Minecraft server. If connection to the server fails or if the server is offline then the default icon is returned. The address value is optional, and if not provided then the default icon is returned.</p>
							<p className="flex items-center gap-2 mt-3">
								<span className="bg-green-700 rounded px-2 py-1 text-xs text-white">GET</span>
								<code className="break-words">https://api.mcstatus.io<span className="font-bold">/v2/icon/&lt;address&gt;</span></code>
							</p>
							<Collapsible title="Response Body" className="block mt-4">
								<Image src={iconExample} width="128" height="128" alt="Sample server icon" />
							</Collapsible>
						</div>
					</section>
				</section >
				<section>
					<AnchorHeader size={2} id="libraries" className="mt-12">Libraries</AnchorHeader>
					<p className="mt-3 leading-7">We try and provide official support for integrating our service into many languages. The list of official and unofficial libraries are below.</p>
					<ul className="list-none flex flex-col gap-3 mt-3">
						<li>
							<a href="https://npmjs.com/package/node-mcstatus" className="button p-4 flex items-center gap-2">
								<span className="text-sm rounded px-2 py-1 bg-green-700 text-white">Official</span>
								<span className="text-sm rounded px-2 py-1 bg-[#f7df1e] text-black font-bold">JavaScript</span>
								<code className="text-black dark:text-white">node-mcstatus</code>
							</a>
						</li>
						<li>
							<a href="https://pkg.go.dev/github.com/mcstatus-io/mcutil" className="button p-4 flex items-center gap-2">
								<span className="text-sm rounded px-2 py-1 bg-green-700 text-white">Official</span>
								<span className="text-sm rounded px-2 py-1 bg-[#02bceb] text-black font-bold">Go</span>
								<code className="text-black dark:text-white">mcutil</code>
							</a>
						</li>
					</ul>
				</section>
				<section>
					<AnchorHeader size={2} id="support" className="mt-12">Support</AnchorHeader>
					<p className="mt-3 leading-7">If you require any additional assistance or found a bug you would like to report, please send an email to <a href="mailto:api@mcstatus.io" className="link">api@mcstatus.io</a>.</p>
				</section>
			</Container >
			<script type="application/ld+json" dangerouslySetInnerHTML={{
				__html: JSON.stringify([
					{
						'@context': 'https://schema.org',
						'@type': 'BreadcrumbList',
						'itemListElement': [
							{
								'@type': 'ListItem',
								'position': 1,
								'name': 'Home',
								'item': 'https://mcstatus.io'
							},
							{
								'@type': 'ListItem',
								'position': 2,
								'name': 'API Documentation',
								'item': 'https://mcstatus.io/docs'
							}
						]
					},
					{
						'@context': 'https://schema.org',
						'@type': 'WebSite',
						'url': 'https://mcstatus.io',
						'potentialAction': {
							'@type': 'SearchAction',
							'target': {
								'@type': 'EntryPoint',
								'urlTemplate': 'https://mcstatus.io/status/java/{host}'
							},
							'query-input': 'required name=host'
						}
					}
				])
			}} />
		</>
	);
}
