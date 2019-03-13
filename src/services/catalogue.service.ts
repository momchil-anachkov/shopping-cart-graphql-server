import { CatalogueItem } from '../types/catalogue-item.type';
import { catalogueRepository as repository, CatalogueRepository } from '../repositories/catalogue.repository';
import { ObjectID } from 'mongodb';

class CatalogueService {
  constructor(
    private catalogueRepository: CatalogueRepository,
  ) {
  }

  public getCatalogueItemById = (id: ObjectID): Promise<CatalogueItem> => {
    return this.catalogueRepository.findOne(id);
  }

  public getCatalogueList = (): Promise<CatalogueItem[]> => {
    return this.catalogueRepository.getAll();
  }
}

export const catalogueService = new CatalogueService(repository);
