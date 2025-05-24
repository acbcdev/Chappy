import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number | null) {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);
	useEffect(() => {
		const debounced = setTimeout(() => setDebouncedValue(value), delay || 0);
		return () => {
			clearTimeout(debounced);
		};
	}, [value, delay]);
	return debouncedValue;
}
