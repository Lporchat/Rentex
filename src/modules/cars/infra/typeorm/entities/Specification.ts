import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";

@Entity("specification")
class Specification {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    // toda vez que a classe e instanciada
    constructor() {
        if (!this.id) {
            this.id = v4()
        }
    }
}

export { Specification };