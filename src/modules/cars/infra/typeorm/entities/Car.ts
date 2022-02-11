import { v4 } from "uuid";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm"
import { Category } from "./Category";
import { Specification } from "./Specification";

@Entity('cars')
class Car {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    daily_rate: number;

    @Column()
    license_plate: string;

    @Column()
    fine_amount: number;

    @Column()
    brand: string;

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @Column()
    category_id: string;

    // usando uma tabela de relacionamento utiliza o many to many e depois especifica qual a outra tabela
    @ManyToMany(() => Specification)
    @JoinTable({
        // o nome da tabela
        name: 'specifications_cars',
        // o nome na tabela de relacionamento relacionada a essa classe
        joinColumns: [{ name: 'car_id' }],
        // o nome na tabela de relacionamento relacionada a outra classe
        inverseJoinColumns: [{ name: 'specification_id' }]
    })
    specifications: Specification[];

    @Column()
    available: boolean;

    @CreateDateColumn()
    created_at: Date;


    // toda vez que a classe e instanciada
    constructor() {
        if (!this.id) {
            this.id = v4();
            this.available = true
        }
    }
}

export { Car };