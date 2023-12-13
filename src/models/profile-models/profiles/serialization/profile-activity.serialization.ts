import { Expose } from "class-transformer";

export class ProfileActivitySerialization {
    @Expose()
    month!: number;

    @Expose()
    year!: number;

    @Expose()
    count!: number;
}