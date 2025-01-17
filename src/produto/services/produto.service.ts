import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from '../entities/produto.entity';
import { DeleteResult, ILike, LessThan, MoreThan, Repository } from 'typeorm';
import { Categoria } from '../../categorias/entities/categoria.entity';
import { CategoriaService } from '../../categorias/services/categoria.service';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private categoriaService: CategoriaService,
  ) {}

  async findAll(): Promise<Produto[]> {
    return this.produtoRepository.find({
      relations: {
        categoria: true,
      },
    });
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: {
        categoria: true,
      },
    });

    if (!produto)
      throw new HttpException('Produto não encontrada', HttpStatus.NOT_FOUND);

    return produto;
  }

  async findByName(nome: string): Promise<Produto[]> {
    return this.produtoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        categoria: true,
      },
    });
  }

  async priceLessThan(preco: number): Promise<Produto[]> {
    return this.produtoRepository.find({
      where: {
        preco: LessThan(preco),
      },
      relations: {
        categoria: true,
      },
      order: {
        preco: 'DESC',
      },
    });
  }

  async priceMoreThan(preco: number): Promise<Produto[]> {
    return this.produtoRepository.find({
      where: {
        preco: MoreThan(preco),
      },
      relations: {
        categoria: true,
      },
      order: {
        preco: 'ASC',
      },
    });
  }

  async create(produto: Produto): Promise<Produto> {
    await this.categoriaService.findById(produto.categoria.id);

    return await this.produtoRepository.save(produto);
  }

  async update(produto: Produto): Promise<Produto> {
    await this.findById(produto.id);

    await this.categoriaService.findById(produto.categoria.id);

    return await this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.produtoRepository.delete(id);
  }
}
