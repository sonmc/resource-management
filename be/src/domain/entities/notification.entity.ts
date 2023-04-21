export class NotificationEntity {
    id: number;
    title: string;
    content: string;
    created_by: number;
    to: number;
    type: number;
    vacation_id: number;
    created_at: Date;

    constructor(title, content, user_id, chapter_head, type, vacation_id) {
        this.title = title;
        this.content = content;
        this.created_by = user_id;
        this.to = chapter_head;
        this.type = type;
        this.vacation_id = vacation_id;
    }
}
