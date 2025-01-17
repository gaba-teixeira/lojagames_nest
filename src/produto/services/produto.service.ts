import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from '../entities/produto.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  async findAll(): Promise<Produto[]> {
    return this.produtoRepository.find();
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
    });

    if (!produto)
      throw new HttpException('Produto não encontrada', HttpStatus.NOT_FOUND);

    return produto;
  }

  async findByName(nome: string): Promise<Produto[]> {
    return this.produtoRepository.find({
      where: {
        nome: ILike(`%${nome}`),
      },
    });
  }
}
