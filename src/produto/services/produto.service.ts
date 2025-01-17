import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "../entities/produto.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProdutoService {
 constructor(
        @InjectRepository(Produto)
        private produtoRespository: Repository<Produto>
    ){}

    
}