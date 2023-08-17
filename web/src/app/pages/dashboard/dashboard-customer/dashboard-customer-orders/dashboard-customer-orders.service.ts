import { Injectable } from '@angular/core';

import { PoDynamicFormField, PoDynamicViewField, PoTableColumn } from '@po-ui/ng-components';
import { Gender, Order, OrderStatus, ServiceStatus } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class DashboardCustomerOrdersService {

  public getOrders(): Order[] {
    return [
      { 
        id: crypto.randomUUID(), 
        customer: {
          id: crypto.randomUUID(),
          name: 'Felipe Alexandre',
          surname: 'Ribeiro',
          cpf: '111.222.333.44',
          rg: '11.222.333-4',
          gender: Gender.MALE
        },
        selectedAddress: {
          userId: crypto.randomUUID(),
          street: 'Av. Getúlio Vargas',
          num: '1200',
          district: 'VL. Nova Santana',
          city: 'Assis',
          complement: '',
          state: 'SP',
          zipCode: '19807-130'
        },
        serviceProvider: {
          id: crypto.randomUUID(),
          cnpj: '11.222.333/0001-44',
          companyName: 'B-Heimer Serviços TI',
          coreBusiness: {
            id: crypto.randomUUID(),
            name: 'Informática',
            description: ''
          },
          services: [
            {
              id: crypto.randomUUID(),
              name: '',
              price: 10,
              category: {
                id: crypto.randomUUID(),
                name: '',
                description: '',
              },
              status: ServiceStatus.ACTIVE
            }
          ],
          speciality: []
        },
        price: 150,
        services: [
          {
            id: crypto.randomUUID(),
            name: 'Formatação',
            price: 100,
            category: {
              id: crypto.randomUUID(),
              name: '',
              description: '',
            },
            status: ServiceStatus.ACTIVE
          },
          {
            id: crypto.randomUUID(),
            name: 'Limpeza',
            price: 50,
            category: {
              id: crypto.randomUUID(),
              name: '',
              description: '',
            },
            status: ServiceStatus.ACTIVE
          },
        ],
        status: OrderStatus.CREATED,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id: crypto.randomUUID(), 
        customer: {
          id: crypto.randomUUID(),
          name: 'Felipe Alexandre',
          surname: 'Ribeiro',
          cpf: '111.222.333.44',
          rg: '11.222.333-4',
          gender: Gender.MALE
        },
        selectedAddress: {
          userId: crypto.randomUUID(),
          street: 'Av. Getúlio Vargas',
          num: '1200',
          district: 'VL. Nova Santana',
          city: 'Assis',
          complement: '',
          state: 'SP',
          zipCode: '19807-130'
        },
        serviceProvider: {
          id: crypto.randomUUID(),
          cnpj: '11.222.333/0001-44',
          companyName: 'B-Heimer Serviços TI',
          coreBusiness: {
            id: crypto.randomUUID(),
            name: 'Informática',
            description: ''
          },
          services: [
            {
              id: crypto.randomUUID(),
              name: '',
              price: 10,
              category: {
                id: crypto.randomUUID(),
                name: '',
                description: '',
              },
              status: ServiceStatus.ACTIVE
            }
          ],
          speciality: []
        },
        price: 150,
        services: [
          {
            id: crypto.randomUUID(),
            name: 'Formatação',
            price: 100,
            category: {
              id: crypto.randomUUID(),
              name: '',
              description: '',
            },
            status: ServiceStatus.ACTIVE
          },
          {
            id: crypto.randomUUID(),
            name: 'Limpeza',
            price: 50,
            category: {
              id: crypto.randomUUID(),
              name: '',
              description: '',
            },
            status: ServiceStatus.ACTIVE
          },
        ],
        status: OrderStatus.COMPLETED,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  }

  public getColumns(): PoTableColumn[] {
    return [
      { property: 'createdAt', type: 'date', label: 'Criado' },
      { property: 'id', label: 'Id' },
      { property: 'customer.name', label: 'Cliente' },
      { property: 'serviceProvider.companyName', label: 'Prestador' },
      { property: 'price', type: 'currency', format: 'BRL', label: 'Preço' },
      { property: 'status', type: 'label', labels: 
        [
          { label: 'Criado', color: '#BFC3C7', textColor: '#FFFFFF', value: OrderStatus.CREATED, },
          { label: 'Aceito', color: 'color-01', textColor: '#FFFFFF', value: OrderStatus.ACCEPTED },
          { label: 'Negado', color: 'color-07', textColor: '#FFFFFF', value: OrderStatus.DENIED },
          { label: 'Finalizado', color: 'color-10', textColor: '#FFFFFF', value: OrderStatus.COMPLETED },
        ],
      },
    ];
  }

  public getDynamicOrderFields(): PoDynamicViewField[] {
    return [
      { property: 'customer.name', label: 'Nome', divider: 'Dados do Cliente', gridColumns: 8 },
      { property: 'customer.surname', label: 'Sobrenome', gridColumns: 4 },
      { property: 'customer.rg', label: 'RG', gridColumns: 4  },
      { property: 'customer.cpf', label: 'CPF', gridColumns: 4  },
      { property: 'customer.gender', label: 'Gênero', gridColumns: 4, options: 
        [
          { label: 'Masculino', value: 'MALE' },
          { label: 'Feminino', value: 'FEMALE' },
          { label: '', value: 'OTHER' },
        ] 
      },
      { property: 'selectedAddress.street', label: 'Rua', divider: 'Endereço selecionado', gridColumns: 8 },
      { property: 'selectedAddress.num', label: 'Número', gridColumns: 4 },
      { property: 'selectedAddress.district', label: 'Bairro', gridColumns: 4 },
      { property: 'selectedAddress.complement', label: 'Complemento', gridColumns: 4 },
      { property: 'selectedAddress.city', label: 'Cidade', gridColumns: 4 },
      { property: 'selectedAddress.state', label: 'UF', gridColumns: 8 },
      { property: 'selectedAddress.zipCode', label: 'CEP', gridColumns: 4 },
      { property: 'serviceProvider.companyName', label: 'Empresa', divider: 'Dados do prestador de serviço', gridColumns: 8 },
      { property: 'serviceProvider.cnpj', label: 'CNPJ', gridColumns: 4 },
      { property: 'serviceProvider.coreBusiness.name', label: 'Ramo de Atividade', gridColumns: 12 },
      { property: 'createdAt', label: 'Criado', divider: 'Dados do pedido', gridColumns: 3, type: 'date' },
      { property: 'updatedAt', label: 'Ultima Atualização', gridColumns: 3, type: 'date' },
      { property: 'status', label: 'Situação', gridColumns: 3, tag: true, options: [
        { label: 'Criado', value: OrderStatus.CREATED },
        { label: 'Aceito', value: OrderStatus.ACCEPTED },
        { label: 'Negado', value: OrderStatus.DENIED },
        { label: 'Finalizado', value: OrderStatus.COMPLETED },
      ] },
      { property: 'price', label: 'Preço', gridColumns: 3, type: 'currency', format: 'BRL' },
    ];
  }

  public getDynamicRatingFormFields(): PoDynamicFormField[] {
    return [
      { property: 'rating', label: 'Nota', icon: 'po-icon-star-filled', required: true, divider: 'Avaliação', gridColumns: 12, options: 
        [
          { label: '1 - Ruim', value: 1 },
          { label: '2 - Razoavel', value: 2 },
          { label: '3 - Normal', value: 3 },
          { label: '4 - Bom', value: 4 },
          { label: '5 - Excelente', value: 5 },
        ]
      },
      { property: 'description', label: 'Descrição', gridColumns: 12, rows: 5, optional: true, icon: '' }
    ]
  }
}
  