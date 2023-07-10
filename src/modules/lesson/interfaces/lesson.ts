export interface Lesson {
    lessonId?: number,
    lessonName: string,
    lessonDescription: string,
    lessonStartTime: string,
    lessonEndTime: string,
    lessonDuration?: number | string,
    lessonPrice: number | string,
    createTs?: number,
    updateTs?: number,
}
