import type { Chat } from "@/store/chat";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type TimeGroup = {
	name: string;
	chats: Chat[];
};
const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
// const YEAR = 365 * DAY;
export function groupChats(
	chat: Chat[],
	searchQuery?: string,
): TimeGroup[] | null {
	if (searchQuery) return null;
	const now = new Date();
	const today = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate(),
	).getTime();
	const yesterday = today - DAY;
	const weekAgo = today - WEEK;
	const monthAgo = today - MONTH;
	const yearStart = new Date(now.getFullYear(), 0, 1).getTime();

	const pins: Chat[] = chat.filter((c) => c.pinned);
	const todayChats: Chat[] = [];
	const yesterdayChats: Chat[] = [];
	const last7DaysChats: Chat[] = [];
	const last30DaysChats: Chat[] = [];
	const thisYearChats: Chat[] = [];
	const olderChats: Record<number, Chat[]> = {};

	for (const c of chat.filter((c) => !c.pinned)) {
		const chatTime = new Date(c.createdAt).getTime();
		if (chatTime >= today) {
			todayChats.push(c);
		} else if (chatTime >= yesterday) {
			yesterdayChats.push(c);
		} else if (chatTime >= weekAgo) {
			last7DaysChats.push(c);
		} else if (chatTime >= monthAgo) {
			last30DaysChats.push(c);
		} else if (chatTime >= yearStart) {
			thisYearChats.push(c);
		} else {
			const year = new Date(chatTime).getFullYear();
			if (!olderChats[year]) {
				olderChats[year] = [];
			}
			olderChats[year].push(c);
		}
	}
	const results: TimeGroup[] = [];

	if (pins.length > 0) {
		results.push({ name: "Pinned", chats: pins });
	}
	if (todayChats.length > 0) {
		results.push({ name: "Today", chats: todayChats });
	}
	if (yesterdayChats.length > 0) {
		results.push({ name: "Yesterday", chats: yesterdayChats });
	}
	if (last7DaysChats.length > 0) {
		results.push({ name: "Last 7 days", chats: last7DaysChats });
	}
	if (last30DaysChats.length > 0) {
		results.push({ name: "Last 30 days", chats: last30DaysChats });
	}
	if (thisYearChats.length > 0) {
		results.push({ name: "This year", chats: thisYearChats });
	}
	const Older = Object.entries(olderChats).sort(
		([yearA], [yearB]) => Number(yearB) - Number(yearA),
	);
	for (const [year, chats] of Older) {
		results.push({ name: year, chats: chats });
	}
	return results;
}
