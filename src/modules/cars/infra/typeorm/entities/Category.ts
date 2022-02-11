import { v4 } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"

@Entity('categories')
class Category {
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

export { Category };