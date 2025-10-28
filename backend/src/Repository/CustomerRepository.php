<?php

namespace App\Repository;

use App\Entity\Customer;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Customer>
 */
class CustomerRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Customer::class);
    }

    /**
     * Find customer by email
     */
    public function findByEmail(string $email): ?Customer
    {
        return $this->createQueryBuilder('c')
            ->where('c.email = :email')
            ->setParameter('email', $email)
            ->getQuery()
            ->getOneOrNullResult();
    }

    /**
     * Find customers with active rentals
     */
    public function findWithActiveRentals(): array
    {
        return $this->createQueryBuilder('c')
            ->join('c.rentals', 'r')
            ->where('r.status = :status')
            ->setParameter('status', 'active')
            ->getQuery()
            ->getResult();
    }

    /**
     * Search customers by name or email
     */
    public function searchByNameOrEmail(string $query): array
    {
        return $this->createQueryBuilder('c')
            ->where('c.firstName LIKE :query')
            ->orWhere('c.lastName LIKE :query')
            ->orWhere('c.email LIKE :query')
            ->setParameter('query', '%' . $query . '%')
            ->orderBy('c.lastName', 'ASC')
            ->addOrderBy('c.firstName', 'ASC')
            ->getQuery()
            ->getResult();
    }
}
