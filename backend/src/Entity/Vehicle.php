<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\VehicleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;

#[ORM\Entity(repositoryClass: VehicleRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/vehicles',
            normalizationContext: ['groups' => ['vehicle:read']]
        ),
        new GetCollection(
            uriTemplate: '/admin/vehicles',
            security: "is_granted('ROLE_ADMIN')",
            normalizationContext: ['groups' => ['vehicle:read', 'vehicle:admin']]
        ),
        new Get(
            uriTemplate: '/vehicles/{id}',
            normalizationContext: ['groups' => ['vehicle:read', 'vehicle:details']]
        ),
        new Get(
            uriTemplate: '/admin/vehicles/{id}',
            security: "is_granted('ROLE_ADMIN')",
            normalizationContext: ['groups' => ['vehicle:read', 'vehicle:details', 'vehicle:admin']]
        ),
        new Post(
            uriTemplate: '/admin/vehicles',
            security: "is_granted('ROLE_ADMIN')",
            denormalizationContext: ['groups' => ['vehicle:write']]
        ),
        new Put(
            uriTemplate: '/admin/vehicles/{id}',
            security: "is_granted('ROLE_ADMIN')",
            denormalizationContext: ['groups' => ['vehicle:write']]
        ),
        new Patch(
            uriTemplate: '/admin/vehicles/{id}',
            security: "is_granted('ROLE_ADMIN')",
            denormalizationContext: ['groups' => ['vehicle:availability']]
        ),
        new Delete(
            uriTemplate: '/admin/vehicles/{id}',
            security: "is_granted('ROLE_ADMIN')"
        ),
    ]
)]
class Vehicle
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['vehicle:read', 'rental:read', 'rental:admin'])]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    #[Groups(['vehicle:read', 'vehicle:write', 'rental:read', 'rental:admin'])]
    private ?string $brand = null;

    #[ORM\Column(length: 100)]
    #[Groups(['vehicle:read', 'vehicle:write', 'rental:read', 'rental:admin'])]
    private ?string $model = null;

    #[ORM\Column]
    #[Groups(['vehicle:read', 'vehicle:write', 'rental:read', 'rental:admin'])]
    private ?int $year = null;

    #[ORM\Column(length: 50)]
    #[Groups(['vehicle:read', 'vehicle:write', 'rental:read', 'rental:admin'])]
    private ?string $fuelType = null;

    #[ORM\Column(length: 50)]
    #[Groups(['vehicle:read', 'vehicle:write', 'rental:read', 'rental:admin'])]
    private ?string $transmission = null;

    #[ORM\Column]
    #[Groups(['vehicle:read', 'vehicle:write', 'rental:read', 'rental:admin'])]
    private ?int $seats = null;

    #[ORM\Column]
    #[Groups(['vehicle:read', 'vehicle:write', 'rental:read', 'rental:admin'])]
    private ?float $pricePerDay = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['vehicle:read', 'vehicle:write', 'vehicle:details'])]
    private ?string $description = null;

    #[ORM\Column(length: 500)]
    #[Groups(['vehicle:read', 'vehicle:write', 'rental:read', 'rental:admin'])]
    private ?string $imageUrl = null;

    #[ORM\Column(length: 100)]
    #[Groups(['vehicle:read', 'vehicle:write', 'rental:read', 'rental:admin'])]
    private ?string $category = null;

    #[ORM\Column]
    #[Groups(['vehicle:read', 'vehicle:write', 'vehicle:availability', 'vehicle:admin'])]
    #[SerializedName('isAvailable')]
    private ?bool $isAvailable = true;

    #[ORM\Column(length: 100, nullable: true)]
    #[Groups(['vehicle:read', 'vehicle:write', 'vehicle:availability', 'vehicle:admin'])]
    private ?string $unavailabilityReason = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['vehicle:read', 'vehicle:write', 'vehicle:availability', 'vehicle:admin'])]
    private ?string $unavailabilityDetails = null;

    #[ORM\ManyToMany(targetEntity: Equipment::class, inversedBy: 'vehicles')]
    #[Groups(['vehicle:read', 'vehicle:write', 'vehicle:details'])]
    private Collection $equipments;

    public function __construct()
    {
        $this->equipments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBrand(): ?string
    {
        return $this->brand;
    }

    public function setBrand(string $brand): static
    {
        $this->brand = $brand;

        return $this;
    }

    public function getModel(): ?string
    {
        return $this->model;
    }

    public function setModel(string $model): static
    {
        $this->model = $model;

        return $this;
    }

    public function getYear(): ?int
    {
        return $this->year;
    }

    public function setYear(int $year): static
    {
        $this->year = $year;

        return $this;
    }

    public function getFuelType(): ?string
    {
        return $this->fuelType;
    }

    public function setFuelType(string $fuelType): static
    {
        $this->fuelType = $fuelType;

        return $this;
    }

    public function getTransmission(): ?string
    {
        return $this->transmission;
    }

    public function setTransmission(string $transmission): static
    {
        $this->transmission = $transmission;

        return $this;
    }

    public function getSeats(): ?int
    {
        return $this->seats;
    }

    public function setSeats(int $seats): static
    {
        $this->seats = $seats;

        return $this;
    }

    public function getPricePerDay(): ?float
    {
        return $this->pricePerDay;
    }

    public function setPricePerDay(float $pricePerDay): static
    {
        $this->pricePerDay = $pricePerDay;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getImageUrl(): ?string
    {
        return $this->imageUrl;
    }

    public function setImageUrl(string $imageUrl): static
    {
        $this->imageUrl = $imageUrl;

        return $this;
    }

    public function getCategory(): ?string
    {
        return $this->category;
    }

    public function setCategory(string $category): static
    {
        $this->category = $category;

        return $this;
    }

    public function isAvailable(): ?bool
    {
        return $this->isAvailable;
    }

    #[Groups(['vehicle:read', 'vehicle:write', 'vehicle:availability', 'vehicle:admin'])]
    public function getIsAvailable(): ?bool
    {
        return $this->isAvailable;
    }

    public function setIsAvailable(bool $isAvailable): static
    {
        $this->isAvailable = $isAvailable;

        return $this;
    }

    public function getUnavailabilityReason(): ?string
    {
        return $this->unavailabilityReason;
    }

    public function setUnavailabilityReason(?string $unavailabilityReason): static
    {
        $this->unavailabilityReason = $unavailabilityReason;

        return $this;
    }

    public function getUnavailabilityDetails(): ?string
    {
        return $this->unavailabilityDetails;
    }

    public function setUnavailabilityDetails(?string $unavailabilityDetails): static
    {
        $this->unavailabilityDetails = $unavailabilityDetails;

        return $this;
    }

    /**
     * @return Collection<int, Equipment>
     */
    public function getEquipments(): Collection
    {
        return $this->equipments;
    }

    public function addEquipment(Equipment $equipment): static
    {
        if (!$this->equipments->contains($equipment)) {
            $this->equipments->add($equipment);
        }

        return $this;
    }

    public function removeEquipment(Equipment $equipment): static
    {
        $this->equipments->removeElement($equipment);

        return $this;
    }
}


