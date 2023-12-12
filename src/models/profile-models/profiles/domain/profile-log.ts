
export class ProfileLog {
    viewPostLogs!: ProfileActivityDetail;
    searchLogs!: ProfileActivityDetail;
    applyLogs!: ProfileActivityDetail;
}

export class ProfileActivityDetail {
    total!: number;

    activities!: ProfileActivity[];

    constructor(_total: number, _activities: ProfileActivity[]) {
        this.total = +_total;
        
        // const lastMonthLogs = _activities[0].month;
        // const lastYearLogs = _activities[0].year;

        let currentMonth = new Date().getMonth() + 1;
        let currentYear = new Date().getFullYear();

        const activities: ProfileActivity[] = [];

        // init activities
        for (let i = 0; i < 12; i++) {
            activities.push(new ProfileActivity(currentMonth, currentYear, 0));

            currentMonth--;
            if (currentMonth === 0) {
                currentMonth = 12;
                currentYear--;
            }
        }

        // fill activities
        for (const activity of _activities) {
            const index = activities.findIndex((item) => item.month === activity.month && item.year === activity.year);

            if (index !== -1) {
                activities[index].count = +activity.count;
            }
        }

        this.activities = activities;

    }
}

export class ProfileActivity {
    month!: number;
    year!: number;
    count!: number;

    constructor(_month: number, _year: number, _count: number) {
        this.month = _month;
        this.year = _year;
        this.count = _count;
    }
}