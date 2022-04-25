import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { v4 } from "uuid";


@Entity('users')
class User {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    drive_license: string;

    @Column()
    isAdmin: boolean;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    avatar: string;

    // toda vez que a classe e instanciada
    constructor() {
        if (!this.id) {
            this.id = v4()
        }
    }
}

export { User };


