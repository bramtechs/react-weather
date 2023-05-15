export enum BackgroundTheme {
    Unknown,
    Clouds,
    Sunny,
    Rain,
}

export const BackgroundThemeCSS = {
    [BackgroundTheme.Sunny]: `  bg-slate-600 blur-sm bg-cover bg-[url('/tilesbg/sunshine.jpg')] absolute left-0 top-0 w-full h-full -z-10`,
    [BackgroundTheme.Clouds]: ` bg-slate-600 blur-sm bg-cover bg-[url('/tilesbg/clouds.jpg')] absolute left-0 top-0 w-full h-full -z-10`,
    [BackgroundTheme.Rain]: `   bg-slate-600 blur-sm bg-cover bg-[url('/tilesbg/rain.jpg')] absolute left-0 top-0 w-full h-full -z-10`,
    [BackgroundTheme.Unknown]: `bg-slate-600 blur-sm bg-cover from-gray-700 to-gray-400 absolute left-0 top-0 w-full h-full -z-10`,
};

export function typeNameToTileBackground(type: string): BackgroundTheme {
    const weatherTypeKeys = Object.keys(BackgroundTheme);
    const weatherTypeKey = weatherTypeKeys.find((key) => key === type);
    const literal = BackgroundTheme[weatherTypeKey as keyof typeof BackgroundTheme];
    if (literal) {
        return literal;
    }
    // edge cases
    switch (type.toLowerCase()) {
        case "clear":
            return BackgroundTheme.Sunny;
        default:
            return BackgroundTheme.Unknown;
    }
}
