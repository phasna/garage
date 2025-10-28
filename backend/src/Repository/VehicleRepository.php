<?php

namespace App\Repository;

use App\Entity\Vehicle;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Vehicle>
 */
class VehicleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Vehicle::class);
    }

    /**
     * Find available vehicles for a given date range
     */
    public function findAvailableVehicles(\DateTimeInterface $startDate, \DateTimeInterface $endDate): array
    {
        return $this->createQueryBuilder('v')
            ->where('v.isAvailable = :available')
            ->andWhere('v.id NOT IN (
                SELECT IDENTITY(r.vehicle) FROM App\Entity\Rental r
                WHERE r.status NOT IN (:excludedStatuses)
                AND (
                    (r.startDate <= :startDate AND r.endDate >= :startDate)
                    OR (r.startDate <= :endDate AND r.endDate >= :endDate)
                    OR (r.startDate >= :startDate AND r.endDate <= :endDate)
                )
            )')
            ->setParameter('available', true)
            ->setParameter('startDate', $startDate)
            ->setParameter('endDate', $endDate)
            ->setParameter('excludedStatuses', ['cancelled'])
            ->getQuery()
            ->getResult();
    }

    /**
     * Find vehicles by category
     */
    public function findByCategory(string $category): array
    {
        return $this->createQueryBuilder('v')
            ->where('v.category = :category')
            ->andWhere('v.isAvailable = :available')
            ->setParameter('category', $category)
            ->setParameter('available', true)
            ->orderBy('v.pricePerDay', 'ASC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Find vehicles by price range
     */
    public function findByPriceRange(float $minPrice, float $maxPrice): array
    {
        return $this->createQueryBuilder('v')
            ->where('v.pricePerDay >= :minPrice')
            ->andWhere('v.pricePerDay <= :maxPrice')
            ->andWhere('v.isAvailable = :available')
            ->setParameter('minPrice', $minPrice)
            ->setParameter('maxPrice', $maxPrice)
            ->setParameter('available', true)
            ->orderBy('v.pricePerDay', 'ASC')
            ->getQuery()
            ->getResult();
    }
}
