package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Ba10Menu.
 */
@Entity
@Table(name = "ba_10_menu")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ba10Menu implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 100)
    @Column(name = "nm_nome", length = 100)
    private String nmNome;

    @NotNull
    @Size(max = 100)
    @Column(name = "cd_cod", length = 100, nullable = false)
    private String cdCod;

    @Size(max = 100)
    @Column(name = "db_ordine", length = 100)
    private String dbOrdine;

    @Size(max = 400)
    @Column(name = "dl_path", length = 400)
    private String dlPath;

    @Size(max = 400)
    @Column(name = "dl_icon", length = 400)
    private String dlIcon;

    @Column(name = "bl_link")
    private Boolean blLink;

    @ManyToOne
    private Ba10Menu ba10Menu;

    @OneToMany(mappedBy = "ba10Menu")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Ba10Menu> childs = new HashSet<>();

    @ManyToOne
    private Ba10Menu menuParent;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNmNome() {
        return nmNome;
    }

    public Ba10Menu nmNome(String nmNome) {
        this.nmNome = nmNome;
        return this;
    }

    public void setNmNome(String nmNome) {
        this.nmNome = nmNome;
    }

    public String getCdCod() {
        return cdCod;
    }

    public Ba10Menu cdCod(String cdCod) {
        this.cdCod = cdCod;
        return this;
    }

    public void setCdCod(String cdCod) {
        this.cdCod = cdCod;
    }

    public String getDbOrdine() {
        return dbOrdine;
    }

    public Ba10Menu dbOrdine(String dbOrdine) {
        this.dbOrdine = dbOrdine;
        return this;
    }

    public void setDbOrdine(String dbOrdine) {
        this.dbOrdine = dbOrdine;
    }

    public String getDlPath() {
        return dlPath;
    }

    public Ba10Menu dlPath(String dlPath) {
        this.dlPath = dlPath;
        return this;
    }

    public void setDlPath(String dlPath) {
        this.dlPath = dlPath;
    }

    public String getDlIcon() {
        return dlIcon;
    }

    public Ba10Menu dlIcon(String dlIcon) {
        this.dlIcon = dlIcon;
        return this;
    }

    public void setDlIcon(String dlIcon) {
        this.dlIcon = dlIcon;
    }

    public Boolean isBlLink() {
        return blLink;
    }

    public Ba10Menu blLink(Boolean blLink) {
        this.blLink = blLink;
        return this;
    }

    public void setBlLink(Boolean blLink) {
        this.blLink = blLink;
    }

    public Ba10Menu getBa10Menu() {
        return ba10Menu;
    }

    public Ba10Menu ba10Menu(Ba10Menu ba10Menu) {
        this.ba10Menu = ba10Menu;
        return this;
    }

    public void setBa10Menu(Ba10Menu ba10Menu) {
        this.ba10Menu = ba10Menu;
    }

    public Set<Ba10Menu> getChilds() {
        return childs;
    }

    public Ba10Menu childs(Set<Ba10Menu> ba10Menus) {
        this.childs = ba10Menus;
        return this;
    }

    public Ba10Menu addChilds(Ba10Menu ba10Menu) {
        this.childs.add(ba10Menu);
        ba10Menu.setBa10Menu(this);
        return this;
    }

    public Ba10Menu removeChilds(Ba10Menu ba10Menu) {
        this.childs.remove(ba10Menu);
        ba10Menu.setBa10Menu(null);
        return this;
    }

    public void setChilds(Set<Ba10Menu> ba10Menus) {
        this.childs = ba10Menus;
    }

    public Ba10Menu getMenuParent() {
        return menuParent;
    }

    public Ba10Menu menuParent(Ba10Menu ba10Menu) {
        this.menuParent = ba10Menu;
        return this;
    }

    public void setMenuParent(Ba10Menu ba10Menu) {
        this.menuParent = ba10Menu;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Ba10Menu ba10Menu = (Ba10Menu) o;
        if (ba10Menu.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ba10Menu.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Ba10Menu{" +
            "id=" + getId() +
            ", nmNome='" + getNmNome() + "'" +
            ", cdCod='" + getCdCod() + "'" +
            ", dbOrdine='" + getDbOrdine() + "'" +
            ", dlPath='" + getDlPath() + "'" +
            ", dlIcon='" + getDlIcon() + "'" +
            ", blLink='" + isBlLink() + "'" +
            "}";
    }
}
