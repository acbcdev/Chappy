"use client";

import { cn } from "@/lib/utils";
import type { SourceUIPart } from "@ai-sdk/ui-utils";
import { Link } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

type SourcesListProps = {
	sources: SourceUIPart["source"][];
	className?: string;
};

const getFavicon = (url: string | null) => {
	if (!url) return null;

	try {
		// Check if the URL is valid
		const urlObj = new URL(url);
		// Ensure it's using HTTP or HTTPS protocol
		if (!["http:", "https:"].includes(urlObj.protocol)) {
			return null;
		}

		const domain = urlObj.hostname;
		return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
	} catch {
		// No need to log errors for invalid URLs
		return null;
	}
};

const addUTM = (url: string) => {
	try {
		// Check if the URL is valid
		const u = new URL(url);
		// Ensure it's using HTTP or HTTPS protocol
		if (!["http:", "https:"].includes(u.protocol)) {
			return url; // Return original URL for non-http(s) URLs
		}

		u.searchParams.set("utm_source", "chappy");
		u.searchParams.set("utm_medium", "research");
		u.searchParams.set("ref", "chappy");
		return u.toString();
	} catch {
		// If URL is invalid, return the original URL without modification
		return url;
	}
};

export function SourcesList({ sources, className }: SourcesListProps) {
	const [failedFavicons, setFailedFavicons] = useState<Set<string>>(new Set());

	const formatUrl = (url: string) => {
		try {
			return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
		} catch {
			return url;
		}
	};

	const handleFaviconError = (url: string) => {
		setFailedFavicons((prev) => new Set(prev).add(url));
	};

	return (
		<div className={cn("my-4", className)}>
			<Accordion type="single">
				<AccordionTrigger>
					<div className="flex flex-1 flex-row items-center gap-2 text-left text-sm">
						Sources
						<div className="flex -space-x-1">
							{sources?.map((source, index) => {
								const faviconUrl = getFavicon(source.url);
								const showFallback =
									!faviconUrl || failedFavicons.has(source.url);

								return showFallback ? (
									<div
										key={`${source.url}-${index}`}
										className="bg-muted border-background h-4 w-4 rounded-full border"
									/>
								) : (
									// eslint-disable-next-line @next/next/no-img-element
									<img
										key={`${source.url}-${index}`}
										src={faviconUrl}
										alt={`Favicon for ${source.title}`}
										className="border-background h-4 w-4 rounded-sm border"
										onError={() => handleFaviconError(source.url)}
									/>
								);
							})}
							{sources.length > 3 && (
								<span className="text-muted-foreground ml-1 text-xs">
									+{sources.length - 3}
								</span>
							)}
						</div>
					</div>
				</AccordionTrigger>
				<AccordionContent className="space-y-2 px-3 pt-3 pb-3">
					<ul>
						{sources.map((source) => {
							const faviconUrl = getFavicon(source.url);
							const showFallback =
								!faviconUrl || failedFavicons.has(source.url);

							return (
								<li key={source.id} className="flex items-center text-sm">
									<div className="min-w-0 flex-1 overflow-hidden">
										<a
											href={addUTM(source.url)}
											target="_blank"
											rel="noopener noreferrer"
											className="text-primary group line-clamp-1 flex items-center gap-1 hover:underline"
										>
											{showFallback ? (
												<div className="bg-muted h-4 w-4 flex-shrink-0 rounded-full" />
											) : (
												// eslint-disable-next-line @next/next/no-img-element
												<img
													decoding="async"
													loading="lazy"
													src={faviconUrl}
													alt={`Favicon for ${source.title}`}
													className="h-4 w-4 flex-shrink-0 rounded-sm"
													onError={() => handleFaviconError(source.url)}
												/>
											)}
											<span className="truncate">{source.title}</span>
											<Link className="inline h-3 w-3 flex-shrink-0 opacity-70 transition-opacity group-hover:opacity-100" />
										</a>
										<div className="text-muted-foreground line-clamp-1 text-xs">
											{formatUrl(source.url)}
										</div>
									</div>
								</li>
							);
						})}
					</ul>
				</AccordionContent>
			</Accordion>
		</div>
	);
}
