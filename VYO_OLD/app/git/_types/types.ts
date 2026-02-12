export type RootStackParamList = {
    Symptoms: undefined;
    Login: undefined;
    EmailLogin: undefined;
    EmailRegistration: undefined;
    Privacy: undefined;
    EmailResetPassword: undefined;
    NewPassword: undefined;
    CompleteProfile: undefined;
    Welcome: undefined;
    SyncData: undefined;
    CarePlan: undefined;
    CarePlanPreview: undefined;
    HomeTabs: undefined;
    Home: undefined;
    Calendar: undefined;
    VideoScreen: { videoUrl?: string; title?: string; } | undefined;
    YoutubeScreen: { videoUrl?: string, title?: string } | undefined;
    ArticleScreen: { articleId?: string,};
    SymptomsSuccess: undefined;
    BodyCare: undefined;
    CategoryPage: { categoryName: string };
    StressManagement: undefined;
};

export type TabParamList = {
    Home: undefined;
    CarePlan: undefined;
    AddTask: undefined;
    Challenges: undefined;
    Chat: undefined;
};

