import { notFound } from 'next/navigation';
import Navbar from '../../../../components/Navbar';
import Container from '../../../../components/Container';
import Search from '../../../../components/Search';
import Ad from '../../../../components/Ad';

export default function RootLayout({ children, params: { type, address } }) {
	if (type !== 'java' && type !== 'bedrock') return notFound();

	return (
		<>
			<Navbar />
			<Container>
				<section>
					<hgroup>
						<h1 className="h1">Minecraft Server Status</h1>
						<p className="text-2xl font-light mt-2">Quickly retrieve the status of any Minecraft server</p>
					</hgroup>
					<Search type={type} host={decodeURIComponent(address)} className="mt-5" />
				</section>
				{children}
				<Ad className="mt-4" />
			</Container>
		</>
	);
}
