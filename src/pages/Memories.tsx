import { useEffect, useState } from "react";
import http from "../utils/http";
import { useLoaderData } from "react-router-dom";

type Memory = {
	kid: string;
	title: string;
	description: string;
	year: number;
	month?: string;
	day?: number;
	file_paths: string;
	urls: string;
};

const Memories = () => {
	const memories = useLoaderData() as Memory[];

	return (
		<div className='flex flex-col gap-12'>
			<h1>Memories</h1>
			{memories ? (
				memories.map((memory) => (
					<button key={memory.title}>
						<ul>
							<li>Kid: {memory.kid}</li>
							<li>Title: {memory.title}</li>
							<li>Description: {memory.description}</li>
							<li>Year: {memory.year}</li>
							<li>Month: {memory.month}</li>
							<li>Day: {memory.day}</li>
							<li>Files: {memory.file_paths}</li>
							<li>URLs: {memory.urls}</li>
						</ul>
					</button>
				))
			) : (
				<p>No Memories found.</p>
			)}
		</div>
	);
};

export default Memories;

export const memoryLoader = async () => {
	const res = await http.get("/api/auth/memories");

	if (!res) {
		throw new Error("Could not fetch memories");
	}

	return res.data.Memories || [];
};
